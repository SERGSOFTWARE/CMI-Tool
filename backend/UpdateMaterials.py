import sys
import os
import json
import pandas as pd

# request
input_json = json.loads(sys.argv[1])

# response
response_stdout = {'status': 200, 'message': 'success'}

# Input file path
file_path = os.path.join('CMI_Tool_V1', 'materials_few.xlsx')

# Load the Excel file into a pandas DataFrame
df = pd.read_excel(file_path)

# update column values
for key, val in input_json.items():
    df.loc[df['Prod'] == key, 'FD'] = val

# Save the updated DataFrame back to the Excel file
df.to_excel(file_path, index=False)

# send response
response_stdout = {'status': 200, 'message': 'success'}
print(response_stdout, end='')