import React from 'react'
import classes from '../../components/FormComponent.module.css'
import { Form, Button } from 'react-bootstrap'
import { useState, } from 'react'
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
// import { Formik, Field } from 'formik';
// import "react-datepicker/dist/react-datepicker.css";
// import { DatePickerField } from './DatePicker'
import BlackDiv from '../../components/BlackDiv'
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Config } from '../../Config/Config'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form';


const FormComponent2 = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [selectDegree, setSelectDegree] = useState(0);
    const Schema = yup.object({
        first_name: yup.string().required("This field is required"),
        last_name: yup.string().required("This field is required"),
        middle_name: yup.string().required("This field is required"),
        mobile_no: yup.string().required("This field is required"),
     // gender: yup
        // .object()
        // .shape({
        //   male: yup.string().required("Gender is required (from label)"),
        //   female: yup.string().required("Gender is required")
        // }).nullable() // for handling null value when clearing options via clicking "x"
        // .required("status is required (Gender is required)")
       
         });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema),
      });
      const routeChange = () => {
        // let path = `success`;
        navigate("/success");
    }
    const onSubmit = data => {
        setLoading(true);

        // console.log(data);
    // console.log(errors);
    axios
    .post(`${Config.url.API_URL}/referral-apply`, data)
    .then((res) => {
        // console.log(res, "res")
        if (res?.data?.error?.length >= 1) throw new Error(res?.data?.error[0]);

        toast.success('Registeration Completed');
        routeChange()


        // console.log(res.data.data.token);
    })
    .catch((err) => {
        console.log(err, "err")
        const errMsg = err?.response?.data?.message
            ? err
            : "Error";
        toast.error("error");
        setLoading(false);
    });

    }

    return (
        <div className={classes.ReferSize}>



            <div className="BlackDicContainer" style={{ paddingTop: '20px', paddingBottom: '20px' }}>

                <BlackDiv
                    text="ROLE"
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group controlId="formName" >
                    <Form.Label>Select Preferred Role :</Form.Label>


                    <select {...register("role")}>
                        <option selected disabled value="">Select Preferred Role</option>

                        <option value="Graduate">Entry Level Training Program</option>
                        <option value="Digital_Services(tech)">Entry Level Training Program - TECH</option>
                    </select>
                    <div className="BlackDicContainer" style={{ paddingTop: '10px', paddingBottom: '10px' }}>

                        <BlackDiv
                            text="STAFF"
                        />
                    </div>
                </Form.Group>

                <Form.Label>Referral Code / Staff ID :</Form.Label>
                <Form.Group controlId="formName" >

                    <input type="text" placeholder="Referal Code / Staff ID" {...register("referral_staff_id", {})} />
                </Form.Group>
                <div className="BlackDicContainer" style={{ paddingTop: '10px', paddingBottom: '30px' }}>

                    <BlackDiv
                        text="Candidate Information"
                    />
                </div>

                <div className={classes.Name}>
<div>

                    <Form.Label>First Name :</Form.Label>
                    <Form.Group controlId="formName" >
                        <input type="text" placeholder="First Name" {...register("first_name", {})} />

                    {errors.first_name && <p style={{color: "red"}}>First Name is required</p>}
                    </Form.Group>
</div>
<div>

                    <Form.Label>Middle Name :</Form.Label>

                    <Form.Group controlId="formName" >

                        <input type="text" placeholder="Middle Name" {...register("middle_name", {})} />
                        {errors.middle_name && <p style={{color: "red"}}>Middle Name is required</p>}

                    </Form.Group>
</div>
<div>


                    <Form.Label>Last Name :</Form.Label>

                    <Form.Group controlId="formName" >

                        <input type="text" placeholder="Last Name" {...register("last_name", {})} />
                        {errors.last_name && <p style={{color: "red"}}>Last Name is required</p>}

                    </Form.Group>
</div>

                </div>
                <Form.Label style={{paddingTop: "20px"}}>Gender :</Form.Label>

                <Form.Group controlId="formName" >

                    <select defaultValue=""  {...register("gender")}>
                        <option disabled selected >Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <p style={{color: "red"}}>Gender is Required</p>}
                </Form.Group>
                <Form.Label style={{paddingTop: "20px"}}>Marital Status:</Form.Label>

                <Form.Group controlId="formName" >

<select {...register("marital_status")}>
<option disabled value="" selected>Select Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
</select>
{/* {errors.gender && <p style={{color: "red"}}>Gender is Required</p>} */}
</Form.Group>
                



                <Form.Label style={{paddingTop: "20px"}}>Phone Number</Form.Label>
                <Form.Group controlId="formName" >

                    <input type="number" placeholder="Mobile Number" {...register("mobile_no", {})} />
{errors.mobile_no && <p style={{color: "red"}}>Enter Phone Number</p>}
                </Form.Group>


                <Form.Label style={{paddingTop: "20px"}}>Date Of Birth:</Form.Label>
                <Form.Group controlId="formName" >

                    <input type="date" placeholder="Date of Birth" min="1990-08-01" max="2005-12-31" {...register("date_of_birth", {})} />
                </Form.Group>

                <Form.Label style={{paddingTop: "20px"}}>Email:</Form.Label>
                <Form.Group controlId="formName" >

                    <input type="text" placeholder="Enter Candidate Email" {...register("email", {})} />
                </Form.Group>


                <Form.Label style={{paddingTop: "20px"}}>State of Origin:</Form.Label>
                <Form.Group controlId="formName" >

                    <select {...register("state_of_origin")} >
                        <option selected disabled value="">Select State of Origin</option>
                        <option value="Abia">Abia </option>
                        <option value="Adamawa">Adamawa</option>
                        <option value="Akwa-Ibom">Akwa Ibom</option>
                        <option value="Anambra">Anambra</option>
                        <option value="Bauchi">Bauchi</option>
                        <option value="Bayelsa">Bayelsa</option>
                        <option value="Benue">Benue</option>
                        <option value="Cross Rivers">Cross Rivers</option>
                        <option value="Delta">Delta</option>
                        <option value="Ebonyi">Ebonyi</option>
                        <option value="Edo">Edo</option>
                        <option value="Ekiti">Ekiti</option>
                        <option value="Enugu">Enugu</option>
                        <option value="Gombe">Gombe</option>
                        <option value="Imo">Imo</option>
                        <option value="Jigawa">Jigawa</option>
                        <option value="Kaduna">Kaduna</option>
                        <option value="Kano">Kano</option>
                        <option value="Katsina">Katsina</option>
                        <option value="Kebbi">Kebbi</option>
                        <option value="Kogi">Kogi</option>
                        <option value="Kwara">Kwara</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Nassarawa">Nassarawa</option>
                        <option value="Niger">Niger</option>
                        <option value="Ogun">Ogun</option>
                        <option value="Ondo">Ondo</option>
                        <option value="Osun">Osun</option>
                        <option value="Oyo">Oyo</option>
                        <option value="Plateau">Plateau</option>
                        <option value="Rivers">Rivers</option>
                        <option value="Sokoto">Sokoto</option>
                        <option value="Taraba">Taraba</option>
                        <option value="Yobe">Yobe</option>
                        <option value="Zamfara">Zamfara</option>
                        <option value="FCT Abuja">FCT Abuja</option>
                    </select>
                </Form.Group>
                <Form.Label style={{paddingTop: "20px"}}>State of Residence:</Form.Label>
                <Form.Group controlId="formName" >
                    <select {...register("state_of_residence")}>
                        <option selected disabled value="">Select State of Origin</option>
                        <option value="Abia">Abia </option>
                        <option value="Adamawa">Adamawa</option>
                        <option value="Akwa-Ibom">Akwa Ibom</option>
                        <option value="Anambra">Anambra</option>
                        <option value="Bauchi">Bauchi</option>
                        <option value="Bayelsa">Bayelsa</option>
                        <option value="Benue">Benue</option>
                        <option value="Cross Rivers">Cross Rivers</option>
                        <option value="Delta">Delta</option>
                        <option value="Ebonyi">Ebonyi</option>
                        <option value="Edo">Edo</option>
                        <option value="Ekiti">Ekiti</option>
                        <option value="Enugu">Enugu</option>
                        <option value="Gombe">Gombe</option>
                        <option value="Imo">Imo</option>
                        <option value="Jigawa">Jigawa</option>
                        <option value="Kaduna">Kaduna</option>
                        <option value="Kano">Kano</option>
                        <option value="Katsina">Katsina</option>
                        <option value="Kebbi">Kebbi</option>
                        <option value="Kogi">Kogi</option>
                        <option value="Kwara">Kwara</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Nassarawa">Nassarawa</option>
                        <option value="Niger">Niger</option>
                        <option value="Ogun">Ogun</option>
                        <option value="Ondo">Ondo</option>
                        <option value="Osun">Osun</option>
                        <option value="Oyo">Oyo</option>
                        <option value="Plateau">Plateau</option>
                        <option value="Rivers">Rivers</option>
                        <option value="Sokoto">Sokoto</option>
                        <option value="Taraba">Taraba</option>
                        <option value="Yobe">Yobe</option>
                        <option value="Zamfara">Zamfara</option>
                        <option value="FCT Abuja">FCT Abuja</option>
                    </select>

                </Form.Group>

                <Form.Label style={{paddingTop: "20px"}}>Highest Degree:</Form.Label>
                <Form.Group controlId="formName" >

                    <select {...register("highest_degree")} onChange={(e) => setSelectDegree(e.currentTarget.value)}>
                        <option selected disabled defaultValue=""   >Select Degree</option>
                        {console.log(selectDegree, "sd")}
                        <option value="Secondary School">Secondary School</option>
                        <option value="OND">OND</option>
                        <option value="HND">HND</option>
                        <option value="B.SC /B.A">B.SC /B.A</option>
                        <option value="Masters">Masters</option>
                        <option value="Doctor of Philosophy">Doctor of Philosophy (PhD)</option>
                    </select>
                </Form.Group>
                {selectDegree !== "Secondary School" &&



                    <>
                    <div style={{paddingTop: "20px"}} className={classes.NameInfo}>
                                    <Form.Text  className="text-muted">
                                        Undergraduate Information
                                    </Form.Text>
                                </div>
                        <Form.Label style={{paddingTop: "10px"}}>University:</Form.Label>
                        <Form.Group controlId="formName" >
                            <select {...register("university")}>
                                <option disabled selected value="">Select Undergraduate University</option>

                                <option value="Abubakar Tafawa Balewa University Bauchi"> Abubakar Tafawa Balewa University Bauchi</option>
                                <option value="ACCRA INSTITUTE OF TECHNOLOGY (GHANA)"> ACCRA INSTITUTE OF TECHNOLOGY (GHANA)</option>
                                <option value="Adekunle Ajasin University Akungba- Akoko Ondo State"> Adekunle Ajasin University Akungba- Akoko Ondo State</option>
                                <option value="Afe Babalola University, Ado-Ekiti, Ekiti state"> Afe Babalola University, Ado-Ekiti, Ekiti state</option>
                                <option value="Ahmadu Bello University Kaduna"> Ahmadu Bello University Kaduna</option>
                                <option value="American University of Nigeria,  Yola"> American University of Nigeria,  Yola</option>
                                <option value="Anglia Ruskin University - UK"> Anglia Ruskin University - UK</option>
                                <option value="Babcock University,Ilishan-Remo"> Babcock University,Ilishan-Remo</option>
                                <option value="Bayero University Kano"> Bayero University Kano</option>
                                <option value="Bells University of Technology Ogun"> Bells University of Technology Ogun</option>
                                <option value="Biaka University Institute of Buea, Cameroon"> Biaka University Institute of Buea, Cameroon</option>
                                <option value="Catholic University College of Ghana"> Catholic University College of Ghana</option>
                                <option value="Cavendish University Uganda"> Cavendish University Uganda</option>
                                <option value="Central University, Ghana"> Central University, Ghana</option>
                                <option value="Christian Service University College, Ghana -Kumasi"> Christian Service University College, Ghana -Kumasi</option>
                                <option value="Covenant University Ogun"> Covenant University Ogun</option>
                                <option value="Cross River State University of Science and Technology, Calabar"> Cross River State University of Science and Technology, Calabar</option>
                                <option value="Cyprus International University(Turkish republic of northern cyprus)"> Cyprus International University(Turkish republic of northern cyprus)</option>
                                <option value="Eastern Mediterranean university, Cyprus"> Eastern Mediterranean university, Cyprus</option>
                                <option value="Ebonyi State University Ebonyi"> Ebonyi State University Ebonyi</option>
                                <option value="Ecole Professionnelle Specialisee Universite"> Ecole Professionnelle Specialisee Universite</option>
                                <option value="Ecole Superieure Sainte Felicite University ESSF Akpakpa Cotonou"> Ecole Superieure Sainte Felicite University ESSF Akpakpa Cotonou</option>
                                <option value="EDEXCEL UNIVERSITY BENIN REPUBLIC"> EDEXCEL UNIVERSITY BENIN REPUBLIC</option>
                                <option value="Enugu State University of Science and Technology, ESUT,Enugu State"> Enugu State University of Science and Technology, ESUT,Enugu State</option>
                                <option value="ESAE university Benin republic"> ESAE university Benin republic</option>
                                <option value="ESEP - Le Berger University, Benin Republic"> ESEP - Le Berger University, Benin Republic</option>
                                <option value="Espam Formation University, Benin-Republic"> Espam Formation University, Benin-Republic</option>
                                <option value="Estam Formation University, Benin Republic"> Estam Formation University, Benin Republic</option>
                                <option value="Federal University of Agriculture, Abeokuta Ogun"> Federal University of Agriculture, Abeokuta Ogun</option>
                                <option value="Federal University of Tecchnology, Minna, Niger State"> Federal University of Tecchnology, Minna, Niger State</option>
                                <option value="Federal University of Technology, Owerri"> Federal University of Technology, Owerri</option>
                                <option value="Ghana Institute Of Management and Public Administration"> Ghana Institute Of Management and Public Administration</option>
                                <option value="Hill-City University Benin Republic"> Hill-City University Benin Republic</option>
                                <option value="Houdegbe North America University, Benin republic"> Houdegbe North America University, Benin republic</option>
                                <option value="Institut Suprieur communication et de Gestion, Benin republic"> Institut Suprieur communication et de Gestion, Benin republic</option>
                                <option value="Institut universitaire courage, Benin Republic"> Institut universitaire courage, Benin Republic</option>
                                <option value="International Relations Institut of Cameroon"> International Relations Institut of Cameroon</option>
                                <option value="International University of East Africa, Uganda">International University of East Africa, Uganda</option>
                                <option value="Kampala International University Uganda."> Kampala International University Uganda.</option>
                                <option value="Kwame Nkrumah University Of Science and Technology, Kumasi Ghana"> Kwame Nkrumah University Of Science and Technology, Kumasi Ghana</option>
                                <option value="Ladoke Akinola University of Technology, Ogbomoso, Oyo State"> Ladoke Akinola University of Technology, Ogbomoso, Oyo State</option>
                                <option value="Lagos State University Lagos"> Lagos State University Lagos</option>
                                <option value="Lancaster university"> Lancaster university</option>
                                <option value="Les cour sonou University, Benin Republic"> Les cour sonou University, Benin Republic</option>
                                <option value="Methodist University College Accra Ghana">Methodist University College Accra Ghana</option>                                                    
                                <option value="Middlesex University London"> Middlesex University London</option>
                                <option value="Modibbo Adama University of Technology Yola, Adamawa state"> Modibbo Adama University of Technology Yola, Adamawa state</option>
                                <option value="Monash University, Australia"> Monash University, Australia</option>
                                <option value="Nahda College Khartoum"> Nahda College Khartoum</option>
                                <option value="Near East University Turkish Republic of northern cyprus"> Near East University Turkish Republic of northern cyprus</option>
                                <option value="Nnamdi Azikiwe University, Awka Anambra">Nnamdi Azikiwe University, Awka Anambra</option>                                                    
                                <option value="Nottingham Trent University, England"> Nottingham Trent University, England</option>
                                <option value="Obafemi Awolowo University, Osun State, Nigeria"> Obafemi Awolowo University, Osun State, Nigeria</option>
                                <option value="October 6 University, Cairo, Egypt"> October 6 University, Cairo, Egypt</option>
                                <option value="Olabisi Onabanjo University Ago iwoye, Ogun state"> Olabisi Onabanjo University Ago iwoye, Ogun state</option>
                                <option value="Pan Africa University"> Pan Africa University</option>
                                <option value="Redeemer's University Nigeria Osun">Redeemer's University Nigeria Osun</option>                                                    
                                <option value="Rivers State University of Science and Technology, Port Harcourt"> Rivers State University of Science and Technology, Port Harcourt</option>
                                <option value="Shenyang Institute of Engineering"> Shenyang Institute of Engineering</option>
                                <option value="Shenyang University of Chemical technology, China."> Shenyang University of Chemical technology, China.</option>
                                <option value="Sikkim Manipal University Accra Ghana"> Sikkim Manipal University Accra Ghana</option>
                                <option value="Sudan international university, kartoum Sudan"> Sudan international university, kartoum Sudan</option>
                                <option value="University for Development Studies, Ghana">University for Development Studies, Ghana</option> 
                                <option value="University of Maiduguri"> University of Maiduguri</option>
                                <option value="University of Abuja FCT"> University of Abuja FCT</option>
                                <option value="University of Applied Sciences and Management, Port Novo, Benin Republics"> University of Applied Sciences and Management, Port Novo, Benin Republics</option>
                                <option value="University of Benin Edo"> University of Benin Edo</option>
                                <option value="University of Birmingham, England"> University of Birmingham, England</option>
                                <option value="University of Calabar Cross River"> University of Calabar Cross River</option>
                                <option value="University of Cape Coast, Accra- Ghana">University of Cape Coast, Accra- Ghana</option>
                                <option value="UNIVERSITY OF CHESTER, UNITED KINGDOM">UNIVERSITY OF CHESTER, UNITED KINGDOM</option>
                                <option value="University of Education Winneba, Ghana">University of Education Winneba, Ghana</option>
                                <option value="University of Essex">University of Essex</option>
                                <option value="University Of Ghana Accra, Legon">University Of Ghana Accra, Legon</option>
                                <option value="University Of Hertfordshire">University Of Hertfordshire</option>
                                <option value="University of Ibadan Oyo">University of Ibadan Oyo</option>
                                <option value="University of Ilorin, Kwara State">University of Ilorin, Kwara State</option>
                                <option value="University of Jos Plateau">University of Jos Plateau</option>                                                            
                                <option value="University of Lagos, Lagos">University of Lagos Lagos</option>
                                <option value="University of Leicester">University of Leicester</option>
                                <option value="University of Maiduguri, Borno state">University of Maiduguri, Borno state</option>
                                <option value="University of Nigeria, Nsukka Enugu">University of Nigeria, Nsukka Enugu</option>
                                <option value="University of Port Harcourt Rivers">University of Port Harcourt Rivers</option>
                                <option value="University of Sheffield">University of Sheffield</option>
                                <option value="University of Uyo, Akwa Ibom">University of Uyo, Akwa Ibom</option>                                                            
                                <option value="Usmanu Danfodiyo University Sokoto">Usmanu Danfodiyo University Sokoto</option>
                                <option value="West Africa Union University Benin Republic">West Africa Union University Benin Republic</option>
                                <option value="Other">Other</option>
                            </select>
                        </Form.Group>

                        <Form.Label style={{paddingTop: "20px"}}>University (Other):</Form.Label>
                        <Form.Group controlId="formName" >

                            <input type="text" placeholder="Type in University details" {...register("university(others)", {})} />
                        </Form.Group>

                        <Form.Label style={{paddingTop: "20px"}}>Class of Degree:</Form.Label>
                        <Form.Group controlId="formName" >

                            {/* <input type="text" placeholder="Type in Other University" {...register("university(others)", {})} /> */}
                            <select {...register("class_of_deg")}>
                                <option disabled selected>Select Class of Degree</option>
                                <option value="FirstClass">First Class</option>
                                <option value="SecondClassUpper">Second Class Upper </option>
                                <option value="SecondClassLower">Second Class Lower </option>
                                <option value="ThirdClass">Third Class </option>
                                <option value="Pass">Pass </option>
                            </select>
                        </Form.Group>

                        <Form.Label style={{paddingTop: "20px"}}>Course of Study:</Form.Label>
                        <Form.Group controlId="formName" >

                            <input type="text" placeholder="Type in Course" {...register("course", {})} />
                        </Form.Group>

                        <Form.Label style={{paddingTop: "20px"}}>Graduation Date:</Form.Label>
                        <Form.Group controlId="formName" >

                            <input type="date" placeholder="Graduation Date" {...register("graduation_date", {})} />
                        </Form.Group>


                        {
                            selectDegree === "Doctor of Philosophy (PhD)" || "Masters " &&

                            selectDegree != "B.SC /B.A" &&

                            selectDegree !== "OND" &&
                            selectDegree !== "HND" &&

                            <>
                                <Form.Label style={{paddingTop: "20px"}}>Post Graduate University:</Form.Label>
                                <Form.Group controlId="formName" >
                                    <select {...register("post_grad_university")}>
                                        <option disabled selected value="">Select Post Graduate University</option>
                                        <option value="Abubakar Tafawa Balewa University Bauchi"> Abubakar Tafawa Balewa University Bauchi</option>
                                        <option value="ACCRA INSTITUTE OF TECHNOLOGY (GHANA)"> ACCRA INSTITUTE OF TECHNOLOGY (GHANA)</option>
                                        <option value="Adekunle Ajasin University Akungba- Akoko Ondo State"> Adekunle Ajasin University Akungba- Akoko Ondo State</option>
                                        <option value="Afe Babalola University, Ado-Ekiti, Ekiti state"> Afe Babalola University, Ado-Ekiti, Ekiti state</option>
                                        <option value="Ahmadu Bello University Kaduna"> Ahmadu Bello University Kaduna</option>
                                        <option value="American University of Nigeria,  Yola"> American University of Nigeria,  Yola</option>
                                        <option value="Anglia Ruskin University - UK"> Anglia Ruskin University - UK</option>
                                        <option value="Babcock University,Ilishan-Remo"> Babcock University,Ilishan-Remo</option>
                                        <option value="Bayero University Kano"> Bayero University Kano</option>
                                        <option value="Bells University of Technology Ogun"> Bells University of Technology Ogun</option>
                                        <option value="Biaka University Institute of Buea, Cameroon"> Biaka University Institute of Buea, Cameroon</option>
                                        <option value="Catholic University College of Ghana"> Catholic University College of Ghana</option>
                                        <option value="Cavendish University Uganda"> Cavendish University Uganda</option>
                                        <option value="Central University, Ghana"> Central University, Ghana</option>
                                        <option value="Christian Service University College, Ghana -Kumasi"> Christian Service University College, Ghana -Kumasi</option>
                                        <option value="Covenant University Ogun"> Covenant University Ogun</option>
                                        <option value="Cross River State University of Science and Technology, Calabar"> Cross River State University of Science and Technology, Calabar</option>
                                        <option value="Cyprus International University(Turkish republic of northern cyprus)"> Cyprus International University(Turkish republic of northern cyprus)</option>
                                        <option value="Eastern Mediterranean university, Cyprus"> Eastern Mediterranean university, Cyprus</option>
                                        <option value="Ebonyi State University Ebonyi"> Ebonyi State University Ebonyi</option>
                                        <option value="Ecole Professionnelle Specialisee Universite"> Ecole Professionnelle Specialisee Universite</option>
                                        <option value="Ecole Superieure Sainte Felicite University ESSF Akpakpa Cotonou"> Ecole Superieure Sainte Felicite University ESSF Akpakpa Cotonou</option>
                                        <option value="EDEXCEL UNIVERSITY BENIN REPUBLIC"> EDEXCEL UNIVERSITY BENIN REPUBLIC</option>
                                        <option value="Enugu State University of Science and Technology, ESUT,Enugu State"> Enugu State University of Science and Technology, ESUT,Enugu State</option>
                                        <option value="ESAE university Benin republic"> ESAE university Benin republic</option>
                                        <option value="ESEP - Le Berger University, Benin Republic"> ESEP - Le Berger University, Benin Republic</option>
                                        <option value="Espam Formation University, Benin-Republic"> Espam Formation University, Benin-Republic</option>
                                        <option value="Estam Formation University, Benin Republic"> Estam Formation University, Benin Republic</option>
                                        <option value="Federal University of Agriculture, Abeokuta Ogun"> Federal University of Agriculture, Abeokuta Ogun</option>
                                        <option value="Federal University of Tecchnology, Minna, Niger State"> Federal University of Tecchnology, Minna, Niger State</option>
                                        <option value="Federal University of Technology, Owerri"> Federal University of Technology, Owerri</option>
                                        <option value="Ghana Institute Of Management and Public Administration"> Ghana Institute Of Management and Public Administration</option>
                                        <option value="Hill-City University Benin Republic"> Hill-City University Benin Republic</option>
                                        <option value="Houdegbe North America University, Benin republic"> Houdegbe North America University, Benin republic</option>
                                        <option value="Institut Suprieur communication et de Gestion, Benin republic"> Institut Suprieur communication et de Gestion, Benin republic</option>
                                        <option value="Institut universitaire courage, Benin Republic"> Institut universitaire courage, Benin Republic</option>
                                        <option value="International Relations Institut of Cameroon"> International Relations Institut of Cameroon</option>
                                        <option value="International University of East Africa, Uganda">International University of East Africa, Uganda</option>
                                        <option value="Kampala International University Uganda."> Kampala International University Uganda.</option>
                                        <option value="Kwame Nkrumah University Of Science and Technology, Kumasi Ghana"> Kwame Nkrumah University Of Science and Technology, Kumasi Ghana</option>
                                        <option value="Ladoke Akinola University of Technology, Ogbomoso, Oyo State"> Ladoke Akinola University of Technology, Ogbomoso, Oyo State</option>
                                        <option value="Lagos State University Lagos"> Lagos State University Lagos</option>
                                        <option value="Lancaster university"> Lancaster university</option>
                                        <option value="Les cour sonou University, Benin Republic"> Les cour sonou University, Benin Republic</option>
                                        <option value="Methodist University College Accra Ghana">Methodist University College Accra Ghana</option>                                                    
                                        <option value="Middlesex University London"> Middlesex University London</option>
                                        <option value="Modibbo Adama University of Technology Yola, Adamawa state"> Modibbo Adama University of Technology Yola, Adamawa state</option>
                                        <option value="Monash University, Australia"> Monash University, Australia</option>
                                        <option value="Nahda College Khartoum"> Nahda College Khartoum</option>
                                        <option value="Near East University Turkish Republic of northern cyprus"> Near East University Turkish Republic of northern cyprus</option>
                                        <option value="Nnamdi Azikiwe University, Awka Anambra">Nnamdi Azikiwe University, Awka Anambra</option>                                                    
                                        <option value="Nottingham Trent University, England"> Nottingham Trent University, England</option>
                                        <option value="Obafemi Awolowo University, Osun State, Nigeria"> Obafemi Awolowo University, Osun State, Nigeria</option>
                                        <option value="October 6 University, Cairo, Egypt"> October 6 University, Cairo, Egypt</option>
                                        <option value="Olabisi Onabanjo University Ago iwoye, Ogun state"> Olabisi Onabanjo University Ago iwoye, Ogun state</option>
                                        <option value="Pan Africa University"> Pan Africa University</option>
                                        <option value="Redeemer's University Nigeria Osun">Redeemer's University Nigeria Osun</option>                                                    
                                        <option value="Rivers State University of Science and Technology, Port Harcourt"> Rivers State University of Science and Technology, Port Harcourt</option>
                                        <option value="Shenyang Institute of Engineering"> Shenyang Institute of Engineering</option>
                                        <option value="Shenyang University of Chemical technology, China."> Shenyang University of Chemical technology, China.</option>
                                        <option value="Sikkim Manipal University Accra Ghana"> Sikkim Manipal University Accra Ghana</option>
                                        <option value="Sudan international university, kartoum Sudan"> Sudan international university, kartoum Sudan</option>
                                        <option value="University for Development Studies, Ghana">University for Development Studies, Ghana</option> 
                                        <option value="University of Maiduguri"> University of Maiduguri</option>
                                        <option value="University of Abuja FCT"> University of Abuja FCT</option>
                                        <option value="University of Applied Sciences and Management, Port Novo, Benin Republics"> University of Applied Sciences and Management, Port Novo, Benin Republics</option>
                                        <option value="University of Benin Edo"> University of Benin Edo</option>
                                        <option value="University of Birmingham, England"> University of Birmingham, England</option>
                                        <option value="University of Calabar Cross River"> University of Calabar Cross River</option>
                                        <option value="University of Cape Coast, Accra- Ghana">University of Cape Coast, Accra- Ghana</option>
                                        <option value="UNIVERSITY OF CHESTER, UNITED KINGDOM">UNIVERSITY OF CHESTER, UNITED KINGDOM</option>
                                        <option value="University of Education Winneba, Ghana">University of Education Winneba, Ghana</option>
                                        <option value="University of Essex">University of Essex</option>
                                        <option value="University Of Ghana Accra, Legon">University Of Ghana Accra, Legon</option>
                                        <option value="University Of Hertfordshire">University Of Hertfordshire</option>
                                        <option value="University of Ibadan Oyo">University of Ibadan Oyo</option>
                                        <option value="University of Ilorin, Kwara State">University of Ilorin, Kwara State</option>
                                        <option value="University of Jos Plateau">University of Jos Plateau</option>
                                        <option value="University of Lagos, Lagos">University of Lagos Lagos</option>
                                        <option value="University of Leicester">University of Leicester</option>
                                        <option value="University of Maiduguri, Borno state">University of Maiduguri, Borno state</option>
                                        <option value="University of Nigeria, Nsukka Enugu">University of Nigeria, Nsukka Enugu</option>
                                        <option value="University of Port Harcourt Rivers">University of Port Harcourt Rivers</option>
                                        <option value="University of Sheffield">University of Sheffield</option>
                                        <option value="University of Uyo, Akwa Ibom">University of Uyo, Akwa Ibom</option>
                                        <option value="Usmanu Danfodiyo University Sokoto">Usmanu Danfodiyo University Sokoto</option>
                                        <option value="West Africa Union University Benin Republic">West Africa Union University Benin Republic</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </Form.Group>

                                <Form.Label style={{paddingTop: "20px"}}>Masters (Others):</Form.Label>
                                <Form.Group controlId="formName" >
                                    <input type="text" placeholder="Type in Other University" {...register("post_grad_university_others", {})} />
                                </Form.Group>
                                {/* post_grad_course */}
                                <Form.Label style={{paddingTop: "20px"}}>Post Graduate Course:</Form.Label>
                                <Form.Group controlId="formName" >

                                    <input type="text" placeholder="Type in Course"  {...register("post_grad_course", {})} />
                                </Form.Group>
                                <Form.Label style={{paddingTop: "20px"}}>Post Graduate Date:</Form.Label>
                                <Form.Group controlId="formName" >

                                    <input type="date" placeholder="Date of Graduation"  {...register("post_grad_date", {})} />
                                </Form.Group>

                            </>
                        }

                        <Form.Label style={{paddingTop: "20px"}}>Have you Completed NYSC?</Form.Label>
                        <Form.Group controlId="formName" >

                            <select {...register("completed_nysc")}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </Form.Group>

                        <Form.Label style={{paddingTop: "20px"}}>(If Yes) Pass Out Date:</Form.Label>
                        <Form.Group controlId="formName" >

                            <input type="date" placeholder="Nysc Graduation Date"  {...register("nysc_date", {})} />
                        </Form.Group>



                    </>}

                {/* <div className={classes.GenderDOB}> */}



                    <div className={classes.ButtonDiv}>
{
loading == "true"? 

<Button disabled  variant="success" type="submit" size="lg">
                            Submit
                        </Button> : 


                        <Button  variant="success" type="submit" size="lg">
                            Submit
                        </Button>

}
                </div>
            </form>
        </div>
    )
}

export default FormComponent2