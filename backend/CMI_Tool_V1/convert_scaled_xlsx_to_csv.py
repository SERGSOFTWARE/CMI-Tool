#importing pandas as pd
import pandas as pd
  
# Read and store content
# of an excel file 
read_file = pd.read_excel ("scaledflowswithethanol.xlsx")
  
# Write the dataframe object
# into csv file
read_file.to_csv ("conv_B.csv", 
                  index = None,
                  header=True)

