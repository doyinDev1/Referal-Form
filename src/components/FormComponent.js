import React from 'react'
import classes from './FormComponent.module.css'
import { Form, Button } from 'react-bootstrap'
import { useState, } from 'react'
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from './DatePicker'
import BlackDiv from '../components/BlackDiv'
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Config } from '../Config/Config'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"




const Schema = yup.object({
    first_name: yup.string().required("This field is required"),
    last_name: yup.string().required("This field is required"),
    middle_name: yup.string().required("This field is required"),
    // highest_degree: Yup.object().shape({
    //     value: Yup.string()
    // })
    // course: yup.string().required("This field is required"),

    // mobile_no: yup.string().required("This field is required"),

});



const FormComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema),
    });

    // convert val to localdatestring to change format to 2022/12/31 
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString('en-ZA'));
    const [loading, setLoading] = useState(false)
    const [nation, setNation] = useState(false)
    const [selectedState, setSelectedState] = useState("Nigerian")
    // const [selectDegree, setSelectedSchool] = useState("")
    const [selectNation, setSelectNation] = useState(0);
    const [selectDegree, setSelectDegree] = useState(0);
    const [selectUni, setSelectUni] = useState(0);
    const [selectUni2, setSelectUni2] = useState(0);
const [errorCatch, setErrorCatch = useState] = useState([])

    const navigate = useNavigate();
    // console.log(startDate, "1")
    const routeChange = () => {
        // let path = `success`;
        navigate("/success");
    }
    const onSubmit = data => {
        setLoading(true);

        // console.log(data);
        axios
            .post(`${Config.url.API_URL}/tech-apply`, data)
            .then((res) => {
                // console.log(res, "res")
                if (res?.data?.error?.length >= 1) throw new Error(res?.data?.error[0]);

                toast.success('Registeration Completed');
                routeChange()


                // console.log(res.data.data.token);
            })
            .catch((err) => {
                // console.log([err], "error")

                // console.log([err][0].message, "err")
                // setErrorCatch({err})
                const errMsg = [err]?.[0]?.message
                    ? [err][0].message
                    : "Kindly Fill in all Details";
                toast.error(errMsg);
                setLoading(false);
            });

    }

    return (
        <div>
            {/* {console.log(loading, "lo")} */}
            {/* {console.log(JSON.stringify(errorCatch, "errorlo"))} */}
{/* {toast.error(JSON.stringify(errorCatch?.error))} */}

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="BlackDicContainer" style={{ paddingTop: '0px', paddingBottom: '10px' }}>

                    <BlackDiv
                        text="Personal Information"
                    />
                </div>

                <div className={classes.Name}>
                    <Form.Group controlId="formName"  >
                        <Form.Label>First Name :</Form.Label>
                        <Form.Group controlId="formName" >
                            <input type="text" placeholder="First Name" {...register("first_name", {})} />

                            {errors.first_name && <p style={{ color: "red" }}>First Name is required</p>}
                        </Form.Group>
                    </Form.Group>


                    <Form.Group controlId="formName">
                        <Form.Label>Middle Name :</Form.Label>
                        <Form.Group controlId="formName" >

                            <input type="text" placeholder="Middle Name" {...register("middle_name", {})} />
                            {errors.last_name && <p style={{ color: "red" }}>Middle Name is required</p>}

                        </Form.Group>

                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Last Name :</Form.Label>
                        <Form.Group controlId="formName" >

                            <input type="text" placeholder="Last Name" {...register("last_name", {})} />
                            {errors.last_name && <p style={{ color: "red" }}>Last Name is required</p>}

                        </Form.Group>

                    </Form.Group>


                </div>

                <div className={classes.NameInfo}>

                    <Form.Text className="text-muted">
                        Name as it appears on your university and NYSC documents
                    </Form.Text>
                </div>

                <div className={classes.GenderDOB}>
                    <div className={classes.GenderDiv2}>
                        <p>Gender</p>
                        <Form.Group controlId="formName" >

                            <select defaultValue=""  {...register("gender")}>
                                <option disabled value="" >Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <p style={{ color: "red" }}>Gender is Required</p>}
                        </Form.Group>
                    </div>

                    <div className={classes.GenderDiv}>
                        <p>Date of Birth (dd/mm/yy)</p>
                        {/* <DatePickerField name="date_of_birth"
                                    value={values.date_of_birth}
                                    // required
                                    selected={startDate}
                                    // onChange={(date) => setStartDate(date.toLocaleDateString('en-GB'))}
                                    // onClick={date => setStartDate(date.toLocaleDateString('en-GB'))}
                                    excludeDateIntervals={[{ start: subDays(new Date(), 5996), end: addDays(new Date(), 657499) }]}
                                    // onBlur={handleBlur}
                                    // onChange={handleChange}

                                    // onClick={date => setStartDate(date.toLocaleDateString('en-GB'))}

                                    peekNextMonth
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    placeholderText="Date of Birth"
                                    className={touched.date_of_birth && errors.date_of_birth ? "error" : null}
                                // date
                                /> */}
                        <Form.Group controlId="formName" >

                            <input type="date" placeholder="Date of Birth" min="1990-08-01" max="2005-12-31" {...register("date_of_birth", {})} />
                        </Form.Group>
                    </div>


                </div>

                <Form.Label style={{ paddingTop: "20px" }}>Email:</Form.Label>
                <Form.Group controlId="formName" >

                    <input type="text" placeholder="Enter Candidate Email" {...register("email", {})} />
                </Form.Group>

                {/* <div style={{paddingTop: "20px"}} className={classes.GenderDOB}> */}
                <Form.Label style={{ paddingTop: "20px" }}>Phone Number :</Form.Label>
                <Form.Group controlId="formEmail">
                    <input type="number" placeholder="Mobile Number" {...register("mobile_no", {})} />
                    {errors.mobile_no && <p style={{ color: "red" }}>Enter Phone Number</p>}

                </Form.Group>
                {/* </div> */}




                <div className={classes.StateOrigin}>

                    <div className={classes.GenderDiv2}>
                        <p style={{ paddingTop: '15px' }}>Nationality</p>
                        <Form.Group controlId="formName" >
                            <select defaultValue=""  {...register("nationality", { required: true })} onChange={(e) => setSelectNation(e.currentTarget.value)}>
                                <option selected disabled value="">Select Nationality</option>
                                {/* {console.log(selectNation, "sd")} */}
                                <option value="Nigerian" >Nigerian</option>required
                                <option>Other</option>
                            </select>
                        </Form.Group>
                    </div>




                    {/* <Form.Group className="mb-2 " controlId="formBasicText">

<Field style={{ height: 'min-content' }} onChange={(e) => setSelectedState(e.currentTarget.value)} name="marital_statush" as="select" className="select is-fullwidth" required
>
    <option disabled value="" selected>Select Status</option>
    <option value="Nigerian" defaultValue >Nigerian</option>required
    <option value="others">Others</option>
</Field>
</Form.Group> */}


                    {selectNation == "Other" &&


                        <div className={classes.GenderDiv}>
                            <p style={{ paddingTop: '15px' }}>Nationality (Other)</p>
                            <Form.Group controlId="formName" >

                                <input type="text" placeholder="Type in Nationality" {...register("nationality_others", {})} />
                                {/* {errors.last_name && <p style={{color: "red"}}>Middle Name is required</p>} */}

                            </Form.Group>
                        </div>



                    }
                </div>
                {console.log(selectedState, "ss")}
                {selectNation == "Nigerian" &&
                    selectNation !== "Other" &&
                    <div className={classes.StateOrigin}>

                        <div className={classes.GenderDiv2}>
                            <p style={{ paddingTop: '15px' }}>State of Origin</p>
                            <Form.Group controlId="formName" >

                                <select {...register("state_of_origin", { required: true })} >
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
                        </div>
                        <div className={classes.GenderDiv2}>
                            <p style={{ paddingTop: '15px' }}>State of Residence</p>
                            <Form.Group controlId="formName" >
                                <select {...register("state_of_residence", { required: true })}>
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
                        </div>
                    </div>
                }

                <div style={{ paddingTop: "20px" }} className={classes.GenderDiv2}>
                    <p>Marital Status</p>
                    <Form.Group  controlId="formName" >

                        <select {...register("marital_status")}>
                            <option disabled value="" selected>Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                        {/* {errors.gender && <p style={{color: "red"}}>Gender is Required</p>} */}
                    </Form.Group>
                </div>


                <div className="BlackDicContainer" style={{ paddingTop: '20px', paddingBottom: '20px' }}>

                    <BlackDiv
                        text="Education"
                    />
                </div>


                <div className={classes.NameDeg}>
                    <p style={{ paddingTop: '15px' }}>Highest Degree</p>

                    {/* <Form.Group className="mb-2 " controlId="formBasicText" required>
                                <Field name="highest_degree"  onChange={(e) => setSelectedSchool(e.currentTarget.value)} style={{ height: 'min-content' }} as="select" className="select is-fullwidth">


                                    <option selected disabled value="" >Select Degree</option>

                                    <option >Doctor of Philosophy (PhD)</option>

                                    <option >Masters</option>

                                    <option >Undergraduate</option>

                                    <option >Secondary School</option>
                                    {touched.degree && errors.degree ? (
                                        <div className="error-message">{errors.degree}</div>
                                    ) : null}
                                </Field>
                            </Form.Group> */}
                    <Form.Group controlId="formName" >

                        <select defaultValue=""  {...register("highest_degree")} onChange={(e) => setSelectDegree(e.currentTarget.value)}>
                            <option selected disabled value=""   >Select Degree</option>
                            {/* {console.log(selectDegree, "sd")} */}
                            <option value="Secondary School">Secondary School</option>
                            <option value="OND">OND</option>
                            <option value="HND">HND</option>
                            <option value="B.Sc / B.A">B.Sc / B.A</option>
                            <option value="Masters">Masters</option>
                            <option value="Doctor of Philosophy">Doctor of Philosophy (PhD)</option>
                        </select>
                    </Form.Group>
                    {/* {errors.highest_degree && <p style={{color: "red"}}>Select Highest Degree</p>} */}
                    {console.log(selectDegree, "d")}



                    {/* setSelectDegree */}

                </div>
                {/* <div className={classes.GenderDiv2}>
                                <p style={{ paddingTop: '15px' }}>Nationality</p>
                                <Form.Group className="mb-2 " controlId="formBasicText" required>
                                    <select onChange={(e) => setSelectedSchool(e.currentTarget.value)} name="highest_degree">
                                    <option selected disabled defaultValue="" >Select Degree</option>

<option value="Secondary School">Secondary School</option>
<option value="Undergraduate">Undergraduate</option>
<option value="Masters">Masters</option>
<option value="Doctor of Philosophy">Doctor of Philosophy (PhD)</option>



                                    </select>

                                    {touched.highest_degree && errors.highest_degree ? (
                                        <div className="error-message">{errors.highest_degree}</div>
                                    ) : null}
                                </Form.Group>
                            </div> */}
                {/* {console.log(selectedSchool, "schhol")} */}
                {/* <select onChange={(e) => setSelectedSchool(e.currentTarget.value)}>

    <option  selected value="Nigerian">Nigerian</option>
    <option selected disabled value="">Select Degree</option>

<option value="Doctor of Philosophy">Doctor of Philosophy (PhD)</option>

<option value="Masters">Masters</option>

<option value="Undergraduate">Undergraduate</option>

<option value="Secondary School">Secondary School</option>
</select> */}


                {
                    selectDegree !== "Secondary School" &&
                    <>
                        <div className={classes.NameInfo}>
                            <Form.Text className="text-muted">
                                Undergraduate Information
                            </Form.Text>
                        </div>
                        <div className={classes.GenderDiv}>

                            <p style={{ marginBottom: '-30px' }}>Undergraduate University</p>
                            <div className={classes.UnderGrad}>

                                <Form.Group className="mb-2 " style={{ marginTop: '40px' }} controlId="formBasicText">
                                    <select {...register("university")} onChange={(e) => setSelectUni(e.currentTarget.value)}>
                                        {console.log(selectUni, "uni")}
                                        <option disabled selected value="">Select Undergraduate University</option>
                                        <option value="Abubakar Tafawa Balewa University Bauchi"> Abubakar Tafawa Balewa University Bauchi</option>
                                        <option value="Adekunle Ajasin University"> Adekunle Ajasin University</option>
                                        <option value="Afe Babalola University"> Afe Babalola University</option>
                                        <option value="Ahmadu Bello University Kaduna"> Ahmadu Bello University Kaduna</option>
                                        <option value="American University of Nigeria, Yola"> American University of Nigeria, Yola</option>
                                        <option value="Bayero University Kano"> Bayero University Kano</option>
                                        <option value="Bells University of Technology Ogun"> Bells University of Technology Ogun</option>
                                        <option value="Covenant University Ogun"> Covenant University Ogun</option>
                                        <option value="Cross River State University of Science and Technology, Calabar"> Cross River State University of Science and Technology, Calabar</option>
                                        <option value="Ebonyi State University Ebonyi"> Ebonyi State University Ebonyi</option>
                                        <option value="Enugu State University of Science and Technology, Enugu"> Enugu State University of Science and Technology, Enugu</option>
                                        <option value="Federal University of Agriculture, Abeokuta Ogun"> Federal University of Agriculture, Abeokuta Ogun</option>
                                        <option value="Federal University of Technology, Minna, Niger State"> Federal University of Technology, Minna, Niger State</option>
                                        <option value="Federal University of Technology Akure Ondo"> Federal University of Technology Akure Ondo</option>
                                        <option value="Federal University of Technology Owerri Imo"> Federal University of Technology Owerri Imo</option>
                                        <option value="Federal University of Technology, Akure"> Federal University of Technology, Akure</option>
                                        <option value="Ladoke Akinola University of Technology, Ogbomoso, Oyo State"> Ladoke Akinola University of Technology, Ogbomoso, Oyo State</option>
                                        <option value="Lagos State University Lagos"> Lagos State University Lagos</option>
                                        <option value="Modibbo Adama University of Technology, Yola"> Modibbo Adama University of Technology, Yola</option>
                                        <option value="Nnamdi Azikiwe University, Awka"> Nnamdi Azikiwe University, Awka</option>
                                        <option value="Obafemi Awolowo University Osun"> Obafemi Awolowo University Osun</option>
                                        <option value="Olabisi Onabanjo University, Ago Iwoye"> Olabisi Onabanjo University, Ago Iwoye</option>
                                        <option value="Redeemer's University Nigeria Osun"> Redeemer's University Nigeria Osun</option>
                                        <option value="Rivers State University of Science and Technology, Port Harcourt"> Rivers State University of Science and Technology, Port Harcourt</option>
                                        <option value="University of Abuja, Gwagwalada"> University of Abuja, Gwagwalada</option>
                                        <option value="University of Benin"> University of Benin</option>
                                        <option value="University of Calabar"> University of Calabar</option>
                                        <option value="University of Ibadan"> University of Ibadan</option>
                                        <option value="University of Ilorin, Kwara State"> University of Ilorin, Kwara State</option>
                                        <option value="University of Jos"> University of Jos</option>
                                        <option value="University of Lagos"> University of Lagos</option>
                                        <option value="University of Maiduguri"> University of Maiduguri</option>
                                        <option value="University of Nigeria, Nsukka"> University of Nigeria, Nsukka</option>
                                        <option value="University of Port Harcourt Rivers"> University of Port Harcourt Rivers</option>
                                        <option value="University of Uyo"> University of Uyo</option>
                                        <option value="Usmanu Danfodiyo University"> Usmanu Danfodiyo University</option>
                                        <option value="Pan Africa University"> Pan Africa University</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </Form.Group>

                                {
                                    selectUni == "Other" &&


                                    <div className={classes.Padded}>

                                        <Form.Group controlId="formName" >
                                            <Form.Label>University (Other):</Form.Label>
                                            <input type="text" placeholder="Type in University details" {...register("university_others", {})} />

                                        </Form.Group>
                                    </div>
                                }
                                <div className={classes.GenderDivGD}>
                                    <p>Graduation Date (dd/mm/yy)</p>
                                    <Form.Group controlId="formName">
                                        <input type="date" placeholder="Graduation Date" {...register("graduation_date", {})} />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className={classes.StateOrigin}>
                            </div>
                            <Form.Label> Course of Study</Form.Label>
                            <Form.Group controlId="formName">
                                <input type="text" placeholder="Type in Course" {...register("course", { required: true })} />

                                {errors.course && <p style={{ color: "red" }}>Type in Your Course</p>}
                            </Form.Group>


                            <div className={classes.NameDeg}>
                                <p style={{ paddingTop: '15px' }}>Class of Degree</p>
                                <Form.Group controlId="formName" >

                                    <select defaultValue="" {...register("class_of_deg")}>
                                        <option value="" disabled >Select Class of Degree</option>
                                        <option value="FirstClass">First Class</option>
                                        <option value="SecondClassUpper">Second Class Upper </option>
                                        <option value="SecondClassLower">Second Class Lower </option>
                                        <option value="ThirdClass">Third Class </option>
                                        <option value="Pass">Pass </option>
                                    </select>
                                </Form.Group>
                            </div>
                        </div>


                        {selectDegree === "Doctor of Philosophy (PhD)" || "Masters " &&

                            selectDegree != "B.Sc / B.A" &&

                            selectDegree !== "OND" &&
                            selectDegree !== "HND" &&

                            <>
                                <div className={classes.NameInfo}>
                                    <Form.Text className="text-muted">
                                        Masters Information (Skip if not applicable)
                                    </Form.Text>
                                </div>

                                <>
                                    <div className={classes.GenderDiv}>

                                        <p >Masters University</p>
                                        <div className={classes.UnderGrad}>


                                            <Form.Group className=" " controlId="formBasicText">
                                                <select {...register("masters_university")} onChange={(e) => setSelectUni2(e.currentTarget.value)}
                                                >
                                                    <option disabled selected value="">Select Masters University</option>
                                                    <option value="Abubakar Tafawa Balewa University Bauchi"> Abubakar Tafawa Balewa University Bauchi</option>
                                                    <option value="Adekunle Ajasin University"> Adekunle Ajasin University</option>
                                                    <option value="Afe Babalola University"> Afe Babalola University</option>
                                                    <option value="Ahmadu Bello University Kaduna"> Ahmadu Bello University Kaduna</option>
                                                    <option value="American University of Nigeria, Yola"> American University of Nigeria, Yola</option>
                                                    <option value="Bayero University Kano"> Bayero University Kano</option>
                                                    <option value="Bells University of Technology Ogun"> Bells University of Technology Ogun</option>
                                                    <option value="Covenant University Ogun"> Covenant University Ogun</option>
                                                    <option value="Cross River State University of Science and Technology, Calabar"> Cross River State University of Science and Technology, Calabar</option>
                                                    <option value="Ebonyi State University Ebonyi"> Ebonyi State University Ebonyi</option>
                                                    <option value="Enugu State University of Science and Technology, Enugu"> Enugu State University of Science and Technology, Enugu</option>
                                                    <option value="Federal University of Agriculture, Abeokuta Ogun"> Federal University of Agriculture, Abeokuta Ogun</option>
                                                    <option value="Federal University of Technology, Minna, Niger State"> Federal University of Technology, Minna, Niger State</option>
                                                    <option value="Federal University of Technology Akure Ondo"> Federal University of Technology Akure Ondo</option>
                                                    <option value="Federal University of Technology Owerri Imo"> Federal University of Technology Owerri Imo</option>
                                                    <option value="Federal University of Technology, Akure"> Federal University of Technology, Akure</option>
                                                    <option value="Ladoke Akinola University of Technology, Ogbomoso, Oyo State"> Ladoke Akinola University of Technology, Ogbomoso, Oyo State</option>
                                                    <option value="Lagos State University Lagos"> Lagos State University Lagos</option>
                                                    <option value="Modibbo Adama University of Technology, Yola"> Modibbo Adama University of Technology, Yola</option>
                                                    <option value="Nnamdi Azikiwe University, Awka"> Nnamdi Azikiwe University, Awka</option>
                                                    <option value="Obafemi Awolowo University Osun"> Obafemi Awolowo University Osun</option>
                                                    <option value="Olabisi Onabanjo University, Ago Iwoye"> Olabisi Onabanjo University, Ago Iwoye</option>
                                                    <option value="Redeemer's University Nigeria Osun"> Redeemer's University Nigeria Osun</option>
                                                    <option value="Rivers State University of Science and Technology, Port Harcourt"> Rivers State University of Science and Technology, Port Harcourt</option>
                                                    <option value="University of Abuja, Gwagwalada"> University of Abuja, Gwagwalada</option>
                                                    <option value="University of Benin"> University of Benin</option>
                                                    <option value="University of Calabar"> University of Calabar</option>
                                                    <option value="University of Ibadan"> University of Ibadan</option>
                                                    <option value="University of Ilorin, Kwara State"> University of Ilorin, Kwara State</option>
                                                    <option value="University of Jos"> University of Jos</option>
                                                    <option value="University of Lagos"> University of Lagos</option>
                                                    <option value="University of Maiduguri"> University of Maiduguri</option>
                                                    <option value="University of Nigeria, Nsukka"> University of Nigeria, Nsukka</option>
                                                    <option value="University of Port Harcourt Rivers"> University of Port Harcourt Rivers</option>
                                                    <option value="University of Uyo"> University of Uyo</option>
                                                    <option value="Usmanu Danfodiyo University"> Usmanu Danfodiyo University</option>
                                                    <option value="Pan Africa University"> Pan Africa University</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </>

                                {/* <div className={classes.UnderGrad}> */}
                                {selectUni2 == "Other" &&
                                    <>
                                        <Form.Label>University (Other):</Form.Label>
                                        <Form.Group controlId="formName">
                                            <input type="text" placeholder="Type in University details" {...register("university_others", { required: true })} />
                                        </Form.Group>
                                    </>
                                }
                                <div className={classes.GenderDivM}>
                                    <p>Masters Graduation Date</p>
                                    
                                    <Form.Group controlId="formName" >

                                        <input type="date" placeholder="Graduation Date" {...register("post_grad_date", {})} />
                                    </Form.Group>
                                </div>
                                {/* </div> */}
                                <div className={classes.GenderDiv}>
                                    <Form.Label>Course of Study:</Form.Label>
                                    <Form.Group controlId="formName" >
                                        <input type="text" placeholder="Type in Course" {...register("post_grad_course", {})} />

                                    </Form.Group>
                                </div>
                            </>}
                        {selectNation == "Nigerian" &&
                            <>
                                <div className="BlackDicContainer" style={{ paddingTop: '20px', paddingBottom: '20px' }}>

                                    <BlackDiv
                                        text="NYSC"
                                    />
                                </div>
                                <div className={classes.GenderDOB}>

                                    <div className="GenderDiv">
                                        <p>Have you Completed NYSC?</p>
                                        <Form.Group className="mb-2 " controlId="formBasicText">
                                            <select {...register("completed_nysc")}>
                                                <option disabled selected >Select Option</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </Form.Group>
                                    </div>
                                    <div className={classes.GenderDiv}>
                                        <p>(If Yes) Pass Out Date:</p>
                                        <div className={classes.Last}>
                                            <Form.Group controlId="formName">
                                                <input type="date" placeholder="Nysc Graduation Date"  {...register("nysc_date", {})} />

                                            </Form.Group>

                                        </div>
                                    </div>
                                </div>
                            </>
                        }



                    </>}
                <div className={classes.ButtonDiv}>
                    {loading === true ?
                        <Button disabled variant="success" type="submit" size="lg">
                            Submit
                        </Button> :
                        <Button variant="success" type="submit" size="lg">
                            Submit
                        </Button>
                    }
                </div>

            </form>
        </div>
    )
}

export default FormComponent