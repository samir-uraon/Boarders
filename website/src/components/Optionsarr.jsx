import React from 'react'

let date=new Date()

let year=[]
for (let index = 2000; index <=date.getFullYear()+5; index++) {
year.push(index)
	
}
let dept=["Construction Engineering","Information Technology","Instrumentation and Electronics Engineering","Power Engineering","Printing and Packaging Engineering","Printing Engineering"]
let room=[
'S1-01', 'S1-02', 'S1-03', 'S1-04', 'S1-05', 'S1-06', 'S1-07',
'S1-08', 'S1-09', 'S1-10', 'S1-11', 'S1-12', 'S1-13', 'S1-14',
'S1-15', 'S1-16', 'S1-17', 'S1-18', 'S1-19', 'S1-20', 'S1-21',
'S1-22', 'S1-23', 'S1-24', 'S1-25', 'S1-26', 'S1-27', 'S2-01',
'S2-02', 'S2-03', 'S2-04', 'S2-05', 'S2-06', 'S2-07', 'S2-08',
'S2-09', 'S2-10', 'S2-11', 'S2-12', 'S2-13', 'S2-14',
'S2-15', 'S2-16', 'S2-17', 'S2-18', 'S2-19', 'S2-20', 'S2-21',
'S2-22', 'S2-23', 'S2-24', 'S2-25', 'S2-26', 'S2-27', 'S2-28',
'S2-29', 'S2-30', 'S2-31', 'S2-32', 'S3-01', 'S3-02', 'S3-03',
'S3-04', 'S3-05', 'S3-06', 'S3-07', 'S3-08', 'S3-09', 'S3-10',
'S3-11', 'S3-12', 'S3-13', 'S3-14', 'S3-15', 'S3-16', 'S3-17',
'S3-18', 'S3-19', 'S3-20', 'S3-21', 'S3-22', 'S3-23', 'S3-24',
'S3-25', 'S3-26', 'S3-27', 'S3-28', 'S3-29', 'S3-30', 'S3-31',
'S3-32', 'S4-01', 'S4-02', 'S4-03', 'S4-04', 'S4-05',
'S4-06', 'S4-07','S4-08', 'S4-09', 'S4-10',
'S4-11', 'S4-12', 'S4-13', 'S4-14', 'S4-15', 'S4-16', 'S4-17',
	'S4-18', 'S4-19', 'S4-20', 'S4-21', 'S4-22', 'S4-23', 'S4-24',
	'S4-25', 'S4-26', 'S4-27', 'S4-28', 'S4-29', 'S4-30', 'S4-31',
	'S5-01', 'S5-02', 'S5-03', 'S5-04', 'S5-05', 'S5-06', 'S5-07',
	'S5-08', 'S5-09', 'S5-10', 'S5-11', 'S5-12', 'S5-13', 'S5-14',
	'S5-15', 'S5-16', 'S5-17','S5-18', 'S5-19', 'S5-20',
	'S5-21', 'S5-22', 'S5-23', 'S6-01', 'S6-02', 'S6-03', 'S6-04',
	'S6-05', 'S6-06', 'S6-07', 'N1-02', 'N1-03', 'N1-04', 'N2-01',
	'N2-02', 'N2-03', 'N2-04', 'N2-05', 'N2-06', 'N2-07', 'N2-08',
	'N2-09', 'N2-10', 'N2-11', 'N2-12', 'N2-13', 'N2-14', 'N2-15',
	'N2-16', 'N2-17', 'N2-18', 'N2-19', 'N2-20', 'N2-21', 'N2-22',
	'N2-23', 'N2-24', 'N2-25', 'N2-26', 'N2-27', 'N2-28', 'N2-29',
	'N2-30', 'N3-01', 'N3-02', 'N3-03','N3-04', 'N3-05','N2-26', 'N2-27', 'N2-28', 'N2-29', 'N2-30', 'N3-01', 'N3-02',
	'N3-03','N3-04', 'N3-05', 'N3-06', 'N3-07', 'N3-08',
	'N3-09', 'N3-10', 'N3-11', 'N3-12', 'N3-13', 'N3-14', 'N3-15',
	'N3-16', 'N3-17', 'N3-18', 'N3-19', 'N3-20', 'N3-21', 'N3-22',
	'N3-23', 'N3-24', 'N3-25', 'N3-26', 'N3-27', 'N3-28', 'N3-29',
	'N3-30', 'N3-31', 'N3-32', 'N4-01', 'N4-02', 'N4-03', 'N4-04',
	'N4-05', 'N4-06', 'N4-07', 'N4-08', 'N4-09', 'N4-10', 'N4-11',
	'N4-12', 'N4-13', 'N4-14', 'N4-15', 'N4-16', 'N4-17', 'N4-18',
	'N4-19', 'N4-20','N4-21', 'N4-22', 'N4-23', 'N4-24',
	'N4-25', 'N4-26', 'N4-27', 'N4-28', 'N4-29', 'N4-30', 'N5-01',
	'N5-02', 'N5-03', 'N5-04', 'N5-05', 'N5-06', 'N5-07', 'N5-08',
	'N5-09', 'N5-10', 'N5-11', 'N5-12', 'N5-13', 'N5-14', 'N5-15',
	'N5-16', 'N5-17', 'N5-18', 'N5-19', 'N5-20', 'N5-21', 'N5-22',
	'N5-23', 'N6-01', 'N6-02', 'N6-03', 'N6-04', 'N6-05', 'N6-06',
	'N6-07'
]
let Address=['Malda',      
	       'Uttar Dinajpur',
  'Dakshin Dinajpur',  'Murshidabad',
  'Birbhum',           'Hooghly',
  'Paschim Bardhaman', 'Purba Bardhaman',
  'Alipurduar',        'Cooch Behar',
  'Darjeeling',        'Jalpaiguri',
  'Kalimpong',         'Howrah',
  'Kolkata',           'Nadia',
  'North 24 Parganas', 'South 24 Parganas',
  'Bankura',           'Jhargram',
  'Purulia',           'Purba Medinipur',
  'Paschim Medinipur','Andhra Pradesh',   'Arunachal Pradesh',
  'Assam',            'Bihar',
  'Chhattisgarh',     'Goa',
  'Gujarat',          'Haryana',
  'Himachal Pradesh', 'Jharkhand',
  'Karnataka',        'Kerala',
  'Madhya Pradesh',   'Maharashtra',
  'Manipur',          'Meghalaya',
  'Mizoram',          'Nagaland',
  'Odisha',           'Punjab',
  'Rajasthan',        'Sikkim',
  'Tamil Nadu',       'Telangana',
  'Tripura',          'Uttar Pradesh',
  'Uttarakhand',      "Ladakh","Kashmir"]
const Optionsarr = () => {


		return (
				<></>
		)
}

export {year,dept,room,Address}