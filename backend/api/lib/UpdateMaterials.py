import sys
import os
import json
import pandas as pd

# request
input_json = json.loads(sys.argv[1])

# response
response_stdout = {'status': 200, 'message': 'success'}

# Input file path
src_file_path = os.path.join('..', '..', 'data', 'materials_few.xlsx')
dest_file_path = os.path.join('..', '..', 'CMI_Tool_V1', 'materials_few.xlsx')
dest_sheet_name = 'f'

# Load the Excel file into a pandas DataFrame
# xls = pd.ExcelFile('example.xlsx')
# dfs = {sheet_name: xls.parse(sheet_name) for sheet_name in xls.sheet_names}
df = pd.read_excel(src_file_path, sheet_name=dest_sheet_name)

# update column values
for key, val in input_json.items():
    df.loc[df['Prod'] == key, 'FD'] = float(val)

# Save the updated DataFrame back to the Excel file
with pd.ExcelWriter(dest_file_path, mode='a', if_sheet_exists='replace') as writer:    
    df.to_excel(writer, index=False, sheet_name=dest_sheet_name)

# send response
response_stdout = {'status': 200, 'message': 'success'}
print(response_stdout, end='')

""" 
70 4 missing 
70 5 missing 
71 4 missing 
71 6 missing """