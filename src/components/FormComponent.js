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

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Your Email is required').email('Please enter a valid email'),
    first_name: Yup.string().required('Your First name is required'),
    last_name: Yup.string().required('Your Last name is required'),
    middle_name: Yup.string().required('Your Middle name is required'),
    // highest_degree: Yup.string(),
    // mobile_no: Yup.mobile_no().required('Your Phone mobile_no is required'),

});

const FormComponent = () => {

    // convert val to localdatestring to change format to 2022/12/31 
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString('en-ZA'));
    const [loading, setLoading] = useState(false)
    const [nation, setNation] = useState(false)
    const [selectedState, setSelectedState] = useState("Nigerian")
    const [selectedSchool, setSelectedSchool] = useState("")

    const navigate = useNavigate();
    // console.log(startDate, "1")
    const routeChange = () => {
        let path = `success`;
        navigate(path);
    }
    const SendValues = (values) => {
        console.log(values, "values")

        // const doyin = values
        // const myobj = [
        //     ...doyin, selectedSchool
        // ]
        //     const myObj =
        //         {
        //             values,
        //              highest_degree : `${selectedSchool}`
        // }

        // for (const key of Object.keys(doyin)) {
        //     console.log(key(key))
        //     console.log(doyin[key])
        // }

        // console.log(values.keys, "obj")
        axios
            .post(`${Config.url.API_URL}/tech-apply`, values)
            .then((res) => {
                console.log(res, "res")
                if (res?.data?.error?.length >= 1) throw new Error(res?.data?.error[0]);

                routeChange()
                toast.success('Registeration Completed');


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
        <div>
            {/* {console.log(finalData, "finaldata")} */}
            <Formik
                initialValues={{ first_name: "", middle_name: "", degree: "", last_name: "", post_grad_university: "", post_grad_date: "", nationality_others: "", nationality: "", post_grad_course: "", post_grad_university_others: "", nysc_date: "", university_others: "", date_of_birth: "", email: "", graduation_date: "", }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {


                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true)
                    //   Simulate submitting to database, shows us values submitted, resets form
                    // setTimeout(() => {
                    //     // alert(JSON.stringify(values, null, 2));
                    //     resetForm();
                    //     // alert("FormSubmitted")
                    // }, 2000);

                    SendValues(values)
                    // console.log("i don submit oo")
                    // setSubmitting(false)

                    setSubmitting(false)
                    // resetForm();

                }
                }
            >

                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    onClick,
                    isSubmitting,
                }) => (


                    <Form onSubmit={handleSubmit} className="mx-auto">


                        <div className="BlackDicContainer" style={{ paddingTop: '0px', paddingBottom: '10px' }}>

                            <BlackDiv
                                text="Personal Information"
                            />
                        </div>

                        <div className={classes.Name}>
                            <Form.Group controlId="formName">
                                <Form.Label>First Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    value={values.first_name}
                                    className={touched.first_name && errors.first_name ? "error" : null}
                                />
                                {touched.first_name && errors.first_name ? (
                                    <div className="error-message">{errors.first_name}</div>
                                ) : null}
                            </Form.Group>


                            <Form.Group controlId="formName">
                                <Form.Label>Middle Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="middle_name"
                                    placeholder="Middle Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.middle_name}
                                    className={touched.middle_name && errors.middle_name ? "error" : null}
                                />
                                {touched.middle_name && errors.middle_name ? (
                                    <div className="error-message">{errors.middle_name}</div>
                                ) : null}
                            </Form.Group>

                            <Form.Group controlId="formName">
                                <Form.Label>Last Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required

                                    value={values.last_name}
                                    className={touched.last_name && errors.last_name ? "error" : null}
                                />
                                {touched.last_name && errors.last_name ? (
                                    <div className="error-message">{errors.last_name}</div>
                                ) : null}
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
                                <Form.Group className="mb-2 " controlId="formBasicText">

                                    <Field style={{ height: 'min-content' }} name="gender" as="select" className="select is-fullwidth" required
                                    >
                                        <option disabled value="" selected>Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Field>
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
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="date"
                                        name="date_of_birth"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.date_of_birth}
                                        min="1990-08-01" max="2005-12-31"
                                        className={touched.date_of_birth && errors.date_of_birth ? "error" : null}
                                    />
                                    {touched.date_of_birth && errors.date_of_birth ? (
                                        <div className="error-message">{errors.date_of_birth}</div>
                                    ) : null}
                                </Form.Group>
                            </div>


                        </div>
                        <div className={classes.GenderDOB}>

                            <Form.Group controlId="formEmail">
                                <Form.Label>Email :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    required
                                    className={touched.email && errors.email ? "error" : null}
                                />
                                {touched.email && errors.email ? (
                                    <div className="error-message">{errors.email}</div>
                                ) : null}
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Phone Number :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobile_no"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.mobile_no}
                                    required

                                    className={touched.mobile_no && errors.mobile_no ? "error" : null}
                                />
                                {touched.mobile_no && errors.mobile_no ? (
                                    <div className="error-message">{errors.mobile_no}</div>
                                ) : null}
                            </Form.Group>
                        </div>




                        <div className={classes.StateOrigin}>

                            <div className={classes.GenderDiv2}>
                                <p style={{ paddingTop: '15px' }}>Nationality</p>
                                <Form.Group className="mb-2 " controlId="formBasicText" required>
                                    <select onChange={(e) => setSelectedState(e.currentTarget.value)} name="nationality">
                                        <option defaultValue >Nigerian</option>required
                                        <option>Other</option>
                                    </select>

                                    {touched.nationality && errors.nationality ? (
                                        <div className="error-message">{errors.nationality}</div>
                                    ) : null}
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


                            {selectedState == "Other" &&


                                <div className={classes.GenderDiv}>
                                    <p style={{ paddingTop: '15px' }}>Nationality (Other)</p>
                                    <Form.Group controlId="formName">
                                        {/* <Form.Label>Last Name :</Form.Label> */}
                                        <Form.Control
                                            type="text"
                                            name="nationality_others"
                                            placeholder="Nationality"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required

                                            value={values.nationality_others}
                                            className={touched.nationality_others && errors.nationality_others ? "error" : null}
                                        />
                                        {touched.nationality_others && errors.nationality_others ? (
                                            <div className="error-message">{errors.nationality_others}</div>
                                        ) : null}
                                    </Form.Group>
                                </div>



                            }
                        </div>
                        {console.log(selectedState, "ss")}
                        {selectedState == "Nigerian" &&
                            selectedState !== "Other" &&
                            <div className={classes.StateOrigin}>

                                <div className={classes.GenderDiv2}>
                                    <p style={{ paddingTop: '15px' }}>State of Origin</p>
                                    <Form.Group className="mb-2 " controlId="formBasicText" required>

                                        <Field style={{ height: 'min-content' }} name="state_of_origin" as="select" className="select is-fullwidth">
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

                                        </Field>
                                        {touched.stateOfOrigin && errors.stateOfOrigin ? (
                                            <div className="error-message">{errors.stateOfOrigin}</div>
                                        ) : null}
                                    </Form.Group>
                                </div>
                                <div className={classes.GenderDiv2}>
                                    <p style={{ paddingTop: '15px' }}>State of Residence</p>
                                    <Form.Group className="mb-2 " controlId="formBasicText">

                                        <Field style={{ height: 'min-content' }} name="state_of_residence" as="select" className="select is-fullwidth">
                                            <option selected disabled value="">Select State of Residence</option>
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

                                        </Field>
                                    </Form.Group>
                                </div>
                            </div>
                        }

                        <div className={classes.GenderDiv2}>
                            <p>Marital Status</p>
                            <Form.Group className="mb-2 " controlId="formBasicText">

                                <Field style={{ height: 'min-content' }} name="marital_status" as="select" className="select is-fullwidth" required
                                >
                                    <option disabled value="" selected>Select Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </Field>
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
                            <Form.Group className="mb-2 " controlId="formBasicText" required>
                                <select onChange={(e) => setSelectedSchool(e.currentTarget.value)} name="highest_degree">
                                    <option selected disabled defaultValue="" >Select Degree</option>

                                    <option value="Secondary School">Secondary School</option>
                                    <option value="OND">OND</option>
                                    <option value="HND">HND</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Masters">Masters</option>
                                    <option value="Doctor of Philosophy">Doctor of Philosophy (PhD)</option>
                                </select>

                                {touched.highest_degree && errors.highest_degree ? (
                                    <div className="error-message">{errors.highest_degree}</div>
                                ) : null}
                            </Form.Group>
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
                        {console.log(selectedSchool, "schhol")}
                        {/* <select onChange={(e) => setSelectedSchool(e.currentTarget.value)}>

    <option  selected value="Nigerian">Nigerian</option>
    <option selected disabled value="">Select Degree</option>

<option value="Doctor of Philosophy">Doctor of Philosophy (PhD)</option>

<option value="Masters">Masters</option>

<option value="Undergraduate">Undergraduate</option>

<option value="Secondary School">Secondary School</option>
</select> */}


                        {
                            selectedSchool !== "Secondary School" &&
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
                                            <Field style={{ height: 'min-content' }} name="university" as="select" className="select is-fullwidth">
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
                                            </Field>
                                        </Form.Group>
                                        <div className={classes.Padded}>

                                            <Form.Group controlId="formName" >
                                                <Form.Label>University (Other):</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="university_others"
                                                    placeholder=" Other"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.university_others}
                                                    className={touched.university_others && errors.university_others ? "error" : null}
                                                />
                                                {touched.university_others && errors.university_others ? (
                                                    <div className="error-message">{errors.university_others}</div>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                        <div className={classes.GenderDivGD}>
                                            <p>Graduation Date (dd/mm/yy)</p>
                                            {/* <DatePickerField name="graduation_date"
                                                value={values.graduation_date}
                                                placeholder="Graduation Date"
                                                // onChange={handleChange}
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => setStartDate(date)}
                                                onBlur={handleBlur}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="Graduation Date"
                                                className={touched.graduation_date && errors.graduation_date ? "error" : null}
                                                date
                                            /> */}
                                            <Form.Group controlId="formName">
                                                <Form.Control
                                                    type="date"
                                                    name="graduation_date"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.graduation_date}
                                                    // min="1990-08-01" max="2005-12-31"
                                                    className={touched.graduation_date && errors.graduation_date ? "error" : null}
                                                />
                                                {touched.graduation_date && errors.graduation_date ? (
                                                    <div className="error-message">{errors.graduation_date}</div>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className={classes.StateOrigin}>
                                    </div>
                                    <Form.Group controlId="formName">
                                        <Form.Label> Course of Study</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="course"
                                            placeholder="Type in the course you studied"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.course}
                                            className={touched.course && errors.course ? "error" : null}
                                        />
                                        {touched.course && errors.course ? (
                                            <div className="error-message">{errors.course}</div>
                                        ) : null}
                                    </Form.Group>


                                    <div className={classes.NameDeg}>
                                        <p style={{ paddingTop: '15px' }}>Class of Degree</p>
                                        <Form.Group className="mb-2 " controlId="formBasicText">
                                            <Field style={{ height: 'min-content' }} name="class_of_deg" as="select" className="select is-fullwidth">
                                                <option disabled selected>Select Class of Degree</option>
                                                <option value="FirstClass">First Class</option>
                                                <option value="SecondClassUpper">Second Class Upper </option>
                                                <option value="SecondClassLower">Second Class Lower </option>
                                                <option value="ThirdClass">Third Class </option>
                                                <option value="Pass">Pass </option>
                                            </Field>
                                        </Form.Group>
                                    </div>
                                </div>


                                {selectedSchool === "Doctor of Philosophy (PhD)" || "Masters " &&

                                    selectedSchool !== "Undergraduate" &&

                                    selectedSchool !== "OND" &&
                                    selectedSchool !== "HND" &&

                                    <>
                                        <div className={classes.NameInfo}>
                                            <Form.Text className="text-muted">
                                                Masters Information (Skip if not applicable)
                                            </Form.Text>
                                        </div>
                                        {/* <p style={{ paddingTop: '15px', marginBottom: "0px" }}>Select Masters University</p> */}

                                        <>
                                            <div className={classes.GenderDiv}>

                                                <p >Masters University</p>
                                                <div className={classes.UnderGrad}>


                                                    <Form.Group className=" " controlId="formBasicText">
                                                        <Field style={{ height: 'min-content' }} name="post_grad_university" as="select" className="select is-fullwidth">
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
                                                            <option value="Federal University of Tecchnology, Minna, Niger State"> Federal University of Tecchnology, Minna, Niger State</option>
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
                                                        </Field>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </>

                                        <div className={classes.UnderGrad}>
                                            <Form.Group controlId="formName">
                                                <Form.Label>University (Other):</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="post_grad_university_others"
                                                    placeholder="Type in Other University"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.post_grad_university_others}
                                                    className={touched.post_grad_university_others && errors.post_grad_university_others ? "error" : null}
                                                />
                                                {touched.post_grad_university_others && errors.post_grad_university_others ? (
                                                    <div className="error-message">{errors.post_grad_university_others}</div>
                                                ) : null}
                                            </Form.Group>
                                            <div className={classes.GenderDivM}>
                                                <p>Masters Graduation Date</p>
                                                {/* <DatePickerField name="post_grad_date"
                                                    value={values.post_grad_date}
                                                    placeholder="Masters Graduation Date"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    dateFormat="dd/MM/yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    placeholderText="Click to select date"

                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    className={touched.post_grad_date && errors.post_grad_date ? "error" : null}
                                                    date
                                                /> */}
                                                <Form.Group controlId="formName">
                                                    <Form.Control
                                                        type="date"
                                                        name="post_grad_date"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.post_grad_date}
                                                        // min="1990-08-01" max="2005-12-31"
                                                        className={touched.post_grad_date && errors.post_grad_date ? "error" : null}
                                                    />
                                                    {touched.post_grad_date && errors.post_grad_date ? (
                                                        <div className="error-message">{errors.post_grad_date}</div>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className={classes.GenderDiv}>
                                            <Form.Group controlId="formName" >
                                                <Form.Label>Course of Study:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="post_grad_course"
                                                    placeholder="Type in Masters Course"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.post_grad_course}
                                                    className={touched.post_grad_course && errors.post_grad_course ? "error" : null}
                                                />
                                                {touched.post_grad_course && errors.post_grad_course ? (
                                                    <div className="error-message">{errors.post_grad_course}</div>
                                                ) : null}
                                            </Form.Group>
                                        </div>

                                    </>}


                                {selectedState == "Nigerian" &&
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
                                                    <Field style={{ height: 'min-content' }} name="completed_nysc" as="select" className="select is-fullwidth">
                                                        <option disabled value="" selected>Select Option</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </Field>
                                                </Form.Group>
                                            </div>
                                            <div className={classes.GenderDiv}>
                                                <p>(If Yes) Pass Out Date:</p>
                                                <div className={classes.Last}>

                                                    {/* <DatePickerField name="nysc_date"
                                                        value={values.nysc_date}
                                                        placeholder="NYSC pass out Date"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        dateFormat="dd/MM/yyyy"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        className={touched.nysc_date && errors.nysc_date ? "error" : null}
                                                        date
                                                        placeholderText="Click to select date"
                                                    /> */}




                                                    <Form.Group controlId="formName">
                                                        <Form.Control
                                                            type="date"
                                                            name="nysc_date"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.nysc_date}
                                                            // min="1990-08-01" max="2005-12-31"
                                                            className={touched.nysc_date && errors.nysc_date ? "error" : null}
                                                        />
                                                        {touched.nysc_date && errors.nysc_date ? (
                                                            <div className="error-message">{errors.nysc_date}</div>
                                                        ) : null}
                                                    </Form.Group>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }



                            </>}
                        <div className={classes.ButtonDiv}>
                            <Button disabled={isSubmitting} variant="success" type="submit" size="lg">
                                Submit
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormComponent