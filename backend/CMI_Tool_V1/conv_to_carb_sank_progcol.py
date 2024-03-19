#first form a new B matrix where all masses are balanced for a particular process
#we exclude energy and electricity flows for this analysis

#proccoding goes from 0 to 8

import sys
import numpy as np
import xlwt
from xlwt import Workbook
import pandas as pd
from numpy.linalg import inv
import numpy as np
import plotly.graph_objects as go
import plotly.io as pio
from math import nan, isnan
import math

def piecesank(ll, ul):
    ll, ul = int(ll), int(ul)
    print (ll, ul)
    pio.renderers.default = "browser"
    df1 = pd.read_excel("carbflows.xlsx") #get the scaled B matrix
    #these are biomass flows, not recycling7 
    B=(df1.to_numpy().tolist())
    B1=[]
    for i in range(0,len(B)):
        B1.append(B[i][1:])

    prodname=[]
    for i in range(0,len(B)):
        prodname.append(B[i][:1][0])    

    B=B1

    l=df1.columns
    procname=[]
    for i in range(1,len(B[0])+1):
        procname.append(l[i])

    df3=pd.read_excel("proccoding.xlsx") #contains codes for prods and procs each numbered individually i.e. each starts from 0 and continues

    incs=list(df3["Cats"])

    #tackling the product accumulations

    em=[13, 25, 26, 27, 28, 29, 49, 50, 57, 58, 62, 65, 98, 99, 101, 102, ]
    #first addition is to emission, second addition is to products    

    for i in range(0, len(B)): #sum for all processes
        s=0
        for j in range(0, len(B[i])):
            if i!=101 and i!=102 and incs[j]>=ll and incs[j]<=ul: #dont sum energy and electricity
                s+=B[i][j]
        #if s>0 that means extra material came in #this is what we want
        #if s<0 that means extra material went out 
        if s<=0:
            B[i].append(0)
            B[i].append(0)
        else:
            if i in em:
                B[i].append(-s)
                B[i].append(0)
            else:
                B[i].append(0)
                B[i].append(-s)

    #imposing mass balance

    othersin=[]
    for i in range(0, len(B[0])-2): #sum for all processes 
        s=0
        for j in range(0, len(B)):
            if j!=101 and j!=102: #dont sum energy and electricity
                s+=B[j][i]
        if i not in [77, 78, 79, 80, 81, 82, 83]:
            if s>0: #theres extra output, it has to come from somewhere
                othersin.append(-s)
            elif s<0: #there's leftover input
                B[64][i]+=-s #there are 189 product flows
                othersin.append(0)
            else:
                othersin.append(0)
        else:
            othersin.append(0)

    B.append(othersin)
    prodname.append("Others in")
    print (len(B))
    print (len(B[-1]))

    source=[]
    target=[]
    value=[]


    for i in range(0,len(B[0])):

        B[25][i]+=B[26][i]
        B[26][i]=0
        #49 is methane - transfer to 57 NG
        B[57][i]+=B[49][i]
        B[49][i]=0

    for j in range(0, len(B[0])-2):
        B[85][j]+=B[106][j] #converting propene to propylene
        B[106][j]=0 #making propene 0



    procname.append("Emissions")
    procname.append("Products")

    n=len(prodname)

    colorsl=[]
    for i in prodname:
        colorsl.append("indianred")
    for i in procname:
        colorsl.append("darkblue")

    colorsf = []
    flowcolor = "lavender"

    for i in range(0,len(B)): #i is product j is process
        for j in range(0,len(B[i])-2):
            if (abs(B[i][j])<0.0000001 or i in [101,102] or j in [77, 78, 79, 80, 81, 82, 83]):
                pass
            elif j<(len(B[i])-2):
                if incs[j]<ll or incs[j]>ul:
                    pass
                else:
                    if B[i][j]<0:#product to process
                        source.append(i)
                        target.append(n+j)
                        value.append(abs(B[i][j]))
                        colorsf.append(flowcolor)
                    else:#process to product
                        source.append(n+j)
                        target.append(i)
                        value.append(B[i][j])
                        colorsf.append(flowcolor)
            else:
                if B[i][j]<0:#product to process
                    source.append(i)
                    target.append(n+j)
                    value.append(abs(B[i][j]))
                    colorsf.append(flowcolor)
                else:#process to product
                    source.append(n+j)
                    target.append(i)
                    value.append(B[i][j])
                    colorsf.append(flowcolor)

    prods = 0
    for j in range(0, len(B[0])-2):
        prods+=B[111][j]
    source.append(63)
    target.append(111)
    value.append(-prods)
    colorsf.append(flowcolor)

    prods = 0
    for j in range(0, len(B[0])-2):
        prods+=B[41][j]
    source.append(63)
    target.append(41)
    value.append(-prods)
    colorsf.append(flowcolor)

    prods = 0
    for j in range(0, len(B[0])-2):
        prods+=B[150][j]
    source.append(63)
    target.append(150)
    value.append(-prods)
    colorsf.append(flowcolor)

    prods = 0
    for j in range(0, len(B[0])-2):
        prods+=B[45][j]
    source.append(63)
    target.append(45)
    value.append(-prods)
    colorsf.append(flowcolor)

    prods = 0
    for j in range(0, len(B[0])-2):
        prods+=B[84][j]
    source.append(57)
    target.append(84)
    value.append(-prods)
    colorsf.append(flowcolor)

    prods = 0
    for j in range(0, len(B[0])-2):
        prods+=B[84][j]
    source.append(57)
    target.append(155)
    value.append(-prods)
    colorsf.append(flowcolor)

    link=dict(source=source,target=target,value=value, color = colorsf)

    #labelnew=[]
    node=dict(pad=17,thickness=20,label=prodname+procname,color=colorsl)
    data=go.Sankey(link=link,node=node)
    layout = go.Layout(
        autosize=False,
        width=200,
        height=1000
    )
    fig=go.Figure(data)

    fig.update_layout(font_size=17)
    fig.update_layout(
        autosize=False,
        width=1800,
        height=1200)
    fig.show()
    fig.write_image(f'pcw_sanks/carbon{ll}to{ul}.svg')
    
piecesank(sys.argv[1],sys.argv[2])
