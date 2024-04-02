FROM julia:1.9.2 as julia-buid

WORKDIR /build

ENV JULIA_PATH /usr/local/julia
ENV PATH $JULIA_PATH/bin:$PATH

RUN julia -e 'using Pkg; Pkg.add(["JuMP","XLSX","HiGHS"])'
RUN mv ~/.julia /build/julia-artifacts/

#python version 3.11
FROM python:3.11.4-slim as python-build

RUN apt-get update || : && apt-get install python3-venv -y

# python virtual env, see PEP 668
# https://pythonspeed.com/articles/activate-virtualenv-dockerfile/
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# #build react app
# FROM node:slim as react-build

# ARG FRONTEND_PATH='./frontend'

# WORKDIR /client

# COPY $FRONTEND_PATH/package.json /client/package.json

# RUN npm install

# COPY $FRONTEND_PATH/ /client

# RUN npm run build

#build backend and start
FROM node:slim

ARG BACKEND_PATH='./backend'
# ENV NODE_ENV production
ENV JULIA_PATH /usr/local/julia

WORKDIR /app

COPY --from=julia-buid /usr/local/julia /usr/local/julia
COPY --from=julia-buid /build/julia-artifacts/ /root/.julia
COPY --from=python-build / /

ENV PATH $JULIA_PATH/bin:$PATH

WORKDIR /app

COPY $BACKEND_PATH/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY $BACKEND_PATH/package.json /app

RUN npm install

COPY $BACKEND_PATH/ /app

COPY ./env.sh .
# COPY ./.env .

RUN chmod +x env.sh

# CMD ["/bin/sh", "-c", "/app/env.sh && mv ./env-runtime-config.js /app/build && npm start"]
CMD ["/bin/sh", "-c", "npm start"]