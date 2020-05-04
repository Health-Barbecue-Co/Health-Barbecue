import SimpleITK as sitk
import sys, os, time
import pandas as pd

""" Script to read DICOM series. 
    Allow 2 ways of use according the argument of the command line (only the first arg is used):
        - Argument does not end with ".csv": 
            INPUT: argument must be a folder containing DICOM Series (DICOM Series = Folder with *.dcm inside). 
            The script reads all the DICOM series inside.
            OUTPUT: Print the origin coordinates of the image.
        - Argument ends with ".csv": 
            INPUT: argument must be a path to a CSV file. The first column of the CSV file contains path to DICOM 
            Series (folders containing *.dcm).
            The scripts reads the DICOM series of this first column. It retrieves the first origin coordinate and write 
            it in a "prediction" column.
            OUTPUT: csv file with added prediction column, current time in its filename."
"""

if len(sys.argv) < 2:
    print("Please provide at least a folder path as command line argument")
elif len(sys.argv) == 2:
    if not sys.argv[1].endswith(".csv"):
        print("Execute version without csv...")
        exam_dir = sys.argv[1]
        for folder in os.listdir(exam_dir):
            if os.path.isdir(exam_dir + '/' + folder):
                series_IDs = sitk.ImageSeriesReader.GetGDCMSeriesIDs(exam_dir + '/' + folder)
                if not series_IDs:
                    print("Given directory \"" + exam_dir + '/' + folder + "\" does not contain a DICOM series.")
                else:
                    series_file_names = sitk.ImageSeriesReader.GetGDCMSeriesFileNames(exam_dir + '/' + folder, series_IDs[0])
                    series_reader = sitk.ImageSeriesReader()
                    series_reader.SetFileNames(series_file_names)
                    image3D = series_reader.Execute()
                    print("Given directory \"" + exam_dir + '/' + folder + "\" contains a DICOM series with center coordinates : ",
                          image3D.GetOrigin(), ".")
    else:
        print("Execute version with csv. Second column is the value to output (here first coordinate of the center)")
        index=pd.read_csv(sys.argv[1],sep=";")
        files_to_read=index.iloc[:,0]
        predicted_values=[]
        for file in files_to_read:
            series_IDs = sitk.ImageSeriesReader.GetGDCMSeriesIDs(file)
            if not series_IDs:
                print("Given directory \"" + file + "\" does not contain a DICOM series.")
            else:
                series_file_names = sitk.ImageSeriesReader.GetGDCMSeriesFileNames(file, series_IDs[0])
                series_reader = sitk.ImageSeriesReader()
                series_reader.SetFileNames(series_file_names)
                image3D = series_reader.Execute()
                predicted_values.append(image3D.GetOrigin()[0])
        index['prediction']=predicted_values
        index.to_csv(time.strftime("%Y%m%d-%H%M%S")+"_index.csv", index=0)
else:
    print("Only one argument is required, it must be a path to a folder containing DICOM series or a csv file with "
          "paths to DICOM series")
    print(sys.argv)
