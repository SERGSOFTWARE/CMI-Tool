#first argument is least VC position, second is highest
#for full diagram, do first segmenting with values 0 and 3
#julia ConvAssOptAllCompounds_csv.jl #input is materials.xlsx
julia ConvAssOptAllCompounds_highs.jl #input is materials.xlsx
python convert_scaled_xlsx_to_csv.py
python conv_to_sank.py $1 $2 #saves in Folder pcw_sanks