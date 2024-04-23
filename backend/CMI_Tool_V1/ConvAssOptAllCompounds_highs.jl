#assessment of conventional system using optimization
using Pkg
using LinearAlgebra
using JuMP
using HiGHS
import XLSX
xf=XLSX.readxlsx("materials_few.xlsx")
fil=xf["A"];
#prodnames=fil["A2:A97"];
#procnames=fil["B1:CG1"];
A=fil["B2:FP170"];
filf=xf["f"];
fd=filf["B2:B170"];


fil2=xf["B"];
#prodnames=fil["A2:A97"];
procnames=fil["B1:FP1"];
B=fil2["B2:FP200"];
prodnames=fil2["A1:A200"]

#A is an array of type "any"- converting it to an array of type float
#new A is 169 by 171
fakeA=zeros(Float64,169,171)
for i in 1:169
    for j in 1:171
        fakeA[i,j]=convert(Float64,A[i,j])
    end
end
A=fakeA

#B is 191 by 171
fakeB=zeros(Float64,199,171)
for i in 1:199
    for j in 1:171
        fakeB[i,j]=convert(Float64,B[i,j])
    end
end
B=fakeB

posstock=[0,1,2,3,4,5,6,7,9,10,11,12,14,15,16,17,18,22,24,30,31,32,34,35,36,37,38,39,40,46,47,48,52,53,54,55,56,59,60,66,69,70,71,72,73,74,75,76,77,78,79,80,81,85,86,87,88,89,91,92,93,94,95,96,97,100,101,102] #removed isobutene = 45
for i in 1:length(posstock)
    posstock[i]=posstock[i]+1;
end

cmi_model=Model(HiGHS.Optimizer)
@variable(cmi_model, s[1:171]>=0) #all scaling factors have to be non-negative

@objective(cmi_model, Min, sum(abs2.(A*s-fd)))

for i in 1:length(posstock)
    @constraint(cmi_model, dot(B[posstock[i],:], s)>=0)
end

for i in 1:58
    @constraint(cmi_model, dot(A[i,:], s)>=fd[i]) #ensure final demands are met
end
#until before energy/electricity you can have excess

for i in 61:84
    @constraint(cmi_model, dot(A[i,:], s)==fd[i]) #ensure final demands are met
end

for i in 85:154
    @constraint(cmi_model, dot(A[i,:], s)>=fd[i]) #ensure final demands are met
end
#until before energy/electricity you can have excess

for i in 155:161
    @constraint(cmi_model, dot(A[i,:], s)==fd[i]) #ensure final demands are met
end


@constraint(cmi_model, dot(A[163,:], s)>=fd[163]) #hcl
@constraint(cmi_model, dot(A[164,:], s)>=fd[164]) #h2so4
@constraint(cmi_model, dot(A[167,:], s)>=fd[167]) #h3po4

#these are equality constraints on contribution of production pathways

#@constraint(cmi_model, 68*s[55]==11*s[56]) #PE ratios
#@constraint(cmi_model, 68*s[55]==21*s[57])
#@constraint(cmi_model, 7*s[59]+7*s[61]==3*s[58]+3*s[60]) #PET ratios
#@constraint(cmi_model, s[58]==9*s[60])
#@constraint(cmi_model, s[59]==9*s[61])
#@constraint(cmi_model, 9*s[62]==11*s[63]) #PMMA ratios

A1=[24, 68, 44, 45, 62] #positive stocks of chlorine, phosgene, hydroxylamine, hypochlorous acid, nitrous acid
for i in A1
    @constraint(cmi_model, dot(B[i,:], s)>=0) #ensure final demands are met
end

#propylene
@constraint(cmi_model, 0.1361*s[10]+84*s[14]+42*s[15]+21.8*s[16]>=84.8)

#MTO uses 5% of methanol- infeasible 
#@constraint(cmi_model, 32*s[6]==3.6256*s[14])

#global production capacity of methanol is 110 MT
#@constraint(cmi_model, 254.432*s[4]+41.312*s[5]+26.1973*s[6] == 110)

@constraint(cmi_model, 85.5*s[169]-84*s[170]==2) #sucrose ratio1
@constraint(cmi_model, 42*s[170]-75*s[171]==0) #sucrose ratio2

# @constraint(cmi_model, s[169] == 0)
# @constraint(cmi_model, s[170] == 0)
# @constraint(cmi_model, s[171] == 0)


#print(cmi_model)
optimize!(cmi_model)
# println(termination_status(cmi_model))
# compute_conflict!(cmi_model)

# if get_attribute(cmi_model, MOI.ConflictStatus()) == MOI.CONFLICT_FOUND
#    iis_model, _ = copy_conflict(cmi_model)
#    println(iis_model)
# end

# println("----------------------------Process scaling factors----------------------------")

s1=JuMP.value.(s)
#=for i in 1:167
    print(procnames[i])
    print(" : ")
    print(s1[i])
    println("")
end=#

scaledB=B*diagm(s1)

prodflows=B*s1

# println("----------------------------Product Flows----------------------------")

#=for i in 1:190
    print(prodnames[i+1])
    print(" : ")
    print(prodflows[i])
    println("")
end=#

#println(procnames)
prodnames = prodnames[2:end]
#prodnames = vec(collect(prodnames))
XLSX.openxlsx("scaledflowswithethanol.xlsx", mode="w") do xf
    sheet1=xf[1]
    for i in 1:199
       sheet1["A$(i+1)"] = prodnames[i]
    end
    sheet1["B1:FP1"]=procnames;
    sheet1["B2:FP200"]=scaledB;
end

calc=A*s1;

#=using DelimitedFiles
writedlm( "FileName.csv",  calc, ',')=#

#=
xf2=XLSX.readxlsx("costmatrix.xlsx");
fil3=xf2["CostMatrix"];
cm=fil3["B2:CG104"]

fakecm=zeros(Float64,103,84)
for i in 1:103
    for j in 1:84
        fakecm[i,j]=convert(Float64,cm[i,j]);
    end
end
cm=fakecm
print((sum((B*diagm(s1)).*cm)))


XLSX.openxlsx("convopt.xlsx", mode="w") do xf
    sheet1=xf[1];
    sheet1["B2:CG104"]=scaledB;
end=#