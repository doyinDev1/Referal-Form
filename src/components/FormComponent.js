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
import toast , {Toaster } from 'react-hot-toast'

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Your Email is required').email('Please enter a valid email'),
    firstname: Yup.string().required('Your First name is required'),
    lastname: Yup.string().required('Your Last name is required'),
    number: Yup.number().required('Your Phone number is required'),

});

const FormComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const routeChange = () => {
        let path = `success`;
        navigate(path);
    }



    const SendValues = (values) => {


     
		axios
        .post(`${Config.url.API_URL}/apply`, values)
        .then((res) => {
            const userData = JSON.stringify({
                data: res.data,
            });

                sessionStorage.setItem('taCandidate', userData);
            

            toast.success('Registeration Completed');
            routeChange()

          
            // console.log(res.data.data.token);
        })
        .catch((err) => {
            const errMsg = err?.response?.data?.message
                ? err?.response?.data?.message
                : 'Failed to Login!';
            toast.error(errMsg);
            setLoading(false);
        });
    }



    return (
        <div>
            {/* {console.log(finalData, "finaldata")} */}
            <Formik
                initialValues={{ firstname: "", middlename: "", lastname: "", mastersUniversity: "", mastersUniversityOther: "", nyscDate: "", otherUniversity: "", undergraduateUniversity: "", otherUndergradUniversity: "", dateofBirth: "", email: "", gradDate: "", courseOfStudy: "" }}
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
                    resetForm();
                    setSubmitting(false)

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
                        {/* {console.log(values)} */}

                        <div className="BlackDicContainer" style={{ paddingTop: '20px', paddingBottom: '20px' }}>

                            <BlackDiv
                                text="Personal Information"
                            />
                        </div>

                        <div className={classes.Name}>
                            <Form.Group controlId="formName">
                                <Form.Label>First Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    value={values.firstname}
                                    className={touched.firstname && errors.firstname ? "error" : null}
                                />
                                {touched.firstname && errors.firstname ? (
                                    <div className="error-message">{errors.firstname}</div>
                                ) : null}
                            </Form.Group>


                            <Form.Group controlId="formName">
                                <Form.Label>Middle Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="middlename"
                                    placeholder="Middle Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.middlename}
                                    className={touched.middlename && errors.middlename ? "error" : null}
                                />
                                {touched.middlename && errors.middlename ? (
                                    <div className="error-message">{errors.middlename}</div>
                                ) : null}
                            </Form.Group>

                            <Form.Group controlId="formName">
                                <Form.Label>Last Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required

                                    value={values.lastname}
                                    className={touched.lastname && errors.lastname ? "error" : null}
                                />
                                {touched.lastname && errors.lastname ? (
                                    <div className="error-message">{errors.lastname}</div>
                                ) : null}
                            </Form.Group>


                        </div>

                        <div className={classes.NameInfo}>

                            <Form.Text className="text-muted">
                                Name as it appears on your university and NYSC documents
                            </Form.Text>
                        </div>

                        <div className={classes.GenderDOB}>
                            <div className="GenderDiv">
                                <p>Gender</p>
                                <Form.Group className="mb-2 " controlId="formBasicText">

                                    <Field style={{ height: 'min-content' }} name="gender" as="select" className="select is-fullwidth" required
                                    >
                                        <option disabled value="" selected>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Field>
                                </Form.Group>
                            </div>

                            <div className={classes.GenderDiv}>
                                <p>Date of Birth (mm/dd/yy)</p>
                                <DatePickerField name="dateofBirth"
                                    value={values.dateofBirth}
                                    required
                                    selected={startDate}
                                    onChange={handleChange}
                                    onClick={date => setStartDate(date)}
                                    excludeDateIntervals={[{ start: subDays(new Date(), 6574), end: addDays(new Date(), 657499) }]}
                                    onBlur={handleBlur}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className={touched.dateofBirth && errors.dateofBirth ? "error" : null}
                                    placeholderText="Must be 18yrs or older"
                                    date
                                />
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
                                    name="number"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.number}
                                    required

                                    className={touched.number && errors.number ? "error" : null}
                                />
                                {touched.number && errors.number ? (
                                    <div className="error-message">{errors.number}</div>
                                ) : null}
                            </Form.Group>
                        </div>
                        <div className={classes.StateOrigin}>

                            <div className="GenderDiv">
                                <p style={{ paddingTop: '15px' }}>State of Origin</p>
                                <Form.Group className="mb-2 " controlId="formBasicText" required>

                                    <Field style={{ height: 'min-content' }} name="stateOfOrigin" as="select" className="select is-fullwidth">
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
                                        <option value="AYobe">Yobe</option>
                                        <option value="Zamfara">Zamfara</option>
                                        <option value="FCT Abuja">FCT Abuja</option>

                                    </Field>
                                    {touched.stateOfOrigin && errors.stateOfOrigin ? (
                                        <div className="error-message">{errors.stateOfOrigin}</div>
                                    ) : null}
                                </Form.Group>
                            </div>
                            <div className={classes.GenderDiv}>
                                <p style={{ paddingTop: '15px' }}>State of Residence</p>
                                <Form.Group className="mb-2 " controlId="formBasicText">

                                    <Field style={{ height: 'min-content' }} name="state of residence" as="select" className="select is-fullwidth">
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
                                        <option value="AYobe">Yobe</option>
                                        <option value="Zamfara">Zamfara</option>
                                        <option value="FCT Abuja">FCT Abuja</option>

                                    </Field>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="BlackDicContainer" style={{ paddingTop: '20px', paddingBottom: '20px' }}>

                            <BlackDiv
                                text="Education"
                            />
                        </div>

                        <div className={classes.NameInfo}>

                            <Form.Text className="text-muted">
                                Education
                            </Form.Text>
                        </div>
                        <div className={classes.GenderDiv}>

                            <p style={{ paddingTop: '15px' }}>University</p>
                            <Form.Group className="mb-2 " controlId="formBasicText">

                                <Field style={{ height: 'min-content' }} name="University" as="select" className="select is-fullwidth">
                                    <option selected>Select University</option>

                                    <option value="University of Lagos"> University of Lagos</option>
                                    <option value="University of Nigeria">University of Nigeria</option>
                                    <option value="Obafemi Awolowo University">Obafemi Awolowo University</option>
                                    <option value="University of Port Harcourt">University of Port Harcourt</option>
                                    <option value="University of Ilorin">University of Ilorin</option>
                                    <option value="Ahmadu Bello University">Ahmadu Bello University</option>
                                    <option value="University of Benin">University of Benin</option>
                                    <option value="Bayero University Kano">Bayero University Kano</option>
                                    <option value="University of Jos">University of Jos</option>
                                    <option value="Usmanu Danfodio University">Usmanu Danfodio University</option>
                                    <option value="University of Maiduguri">University of Maiduguri</option>
                                    <option value="University of Ilorin">University of Ilorin</option>
                                    <option value="Rivers State University">Rivers State University</option>
                                    <option value="American University of Nigeria">Federal University of Technology, Owerri</option>
                                    <option value="Federal University of Technology, Owerri">Imo State University</option>
                                    <option value="Enugu State University of Science and Technology">Enugu State University of Science and Technology</option>
                                    <option value="Federal University of Technology, Akure">Federal University of Technology, Akure</option>
                                    <option value="Abia State University">Abia State University</option>
                                    <option value="Adekunle Ajasin University">Adekunle Ajasin University</option>
                                    <option value="Federal University of Technology, Minna">Federal University of Technology, Minna</option>
                                    <option value="Ekiti State University, Ado Ekiti">Ekiti State University, Ado Ekiti</option>
                                    <option value="Olabisi Onabanjo University">Olabisi Onabanjo University</option>
                                    <option value="Lagos State University">Lagos State University</option>
                                    <option value="University of Agriculture, Makurdi">University of Agriculture, Makurdi</option>
                                    <option value="Ladoke Akintola University of Technology">Ladoke Akintola University of Technology</option>
                                    <option value="Covenant University">Covenant University</option>
                                    <option value="Babcock University">Babcock University</option>
                                    <option value="Joseph Ayo Babalola University">Joseph Ayo Babalola University</option>
                                    <option value="Bowen University">Bowen University</option>
                                    <option value="Redeemer's University Nigeria">Redeemer's University Nigeria</option>
                                    <option value="Igbinedion University">Igbinedion University</option>
                                    <option value="Afe Babalola University">Afe Babalola University</option>
                                    <option value="Landmark University">Landmark University</option>
                                    <option value="Bells University of Technology">Bells University of Technology</option>
                                    <option value="American University of Nigeria">American University of Nigeria</option>
                                    <option value="Others">Others</option>

                                </Field>
                            </Form.Group>
                            <div  >

                                <Form.Group controlId="formName" >
                                    <Form.Label> Other University (Other):</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="otherUniversity"
                                        placeholder="Type in Other"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.otherUniversity}
                                        className={touched.otherUniversity && errors.otherUniversity ? "error" : null}
                                    />
                                    {touched.otherUniversity && errors.otherUniversity ? (
                                        <div className="error-message">{errors.otherUniversity}</div>
                                    ) : null}
                                </Form.Group>
                            </div>
                        </div>

                        <div className={classes.NameDeg}>
                            <p style={{ paddingTop: '15px' }}>Highest Degree</p>
                            <Form.Group className="mb-2 " controlId="formBasicText">
                                <Field style={{ height: 'min-content' }} name="Highest Degree" as="select" className="select is-fullwidth">
                                    <option selected disabled value="">Degree</option>
                                    <option value="Doctor of Philosophy">Doctor of Philosophy (PhD)</option>
                                    <option value="Masters">Masters</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                </Field>
                            </Form.Group>
                        </div>


                        <div className={classes.NameInfo}>
                            <Form.Text className="text-muted">
                                Undergraduate Information
                            </Form.Text>
                        </div>
                        <div className={classes.GenderDiv}>

                            <p style={{ marginBottom: '-30px' }}>Undergraduate University</p>
                            <div className={classes.UnderGrad}>


                                <Form.Group className="mb-2 " style={{ marginTop: '40px' }} controlId="formBasicText">
                                    <Field style={{ height: 'min-content' }} name="undergraduateUniversity" as="select" className="select is-fullwidth">
                                        <option disabled selected value="">Select Undergraduate University</option>
                                        <option value="University of Lagos"> University of Lagos</option>
                                        <option value="University of Nigeria">University of Nigeria</option>
                                        <option value="Obafemi Awolowo University">Obafemi Awolowo University</option>
                                        <option value="University of Port Harcourt">University of Port Harcourt</option>
                                        <option value="University of Ilorin">University of Ilorin</option>
                                        <option value="Ahmadu Bello University">Ahmadu Bello University</option>
                                        <option value="University of Benin">University of Benin</option>
                                        <option value="Bayero University Kano">Bayero University Kano</option>
                                        <option value="University of Jos">University of Jos</option>
                                        <option value="Usmanu Danfodio University">Usmanu Danfodio University</option>
                                        <option value="University of Maiduguri">University of Maiduguri</option>
                                        <option value="University of Ilorin">University of Ilorin</option>
                                        <option value="Rivers State University">Rivers State University</option>
                                        <option value="American University of Nigeria">Federal University of Technology, Owerri</option>
                                        <option value="Federal University of Technology, Owerri">Imo State University</option>
                                        <option value="Enugu State University of Science and Technology">Enugu State University of Science and Technology</option>
                                        <option value="Federal University of Technology, Akure">Federal University of Technology, Akure</option>
                                        <option value="Abia State University">Abia State University</option>
                                        <option value="Adekunle Ajasin University">Adekunle Ajasin University</option>
                                        <option value="Federal University of Technology, Minna">Federal University of Technology, Minna</option>
                                        <option value="Ekiti State University, Ado Ekiti">Ekiti State University, Ado Ekiti</option>
                                        <option value="Olabisi Onabanjo University">Olabisi Onabanjo University</option>
                                        <option value="Lagos State University">Lagos State University</option>
                                        <option value="University of Agriculture, Makurdi">University of Agriculture, Makurdi</option>
                                        <option value="Ladoke Akintola University of Technology">Ladoke Akintola University of Technology</option>
                                        <option value="Covenant University">Covenant University</option>
                                        <option value="Babcock University">Babcock University</option>
                                        <option value="Joseph Ayo Babalola University">Joseph Ayo Babalola University</option>
                                        <option value="Bowen University">Bowen University</option>
                                        <option value="Redeemer's University Nigeria">Redeemer's University Nigeria</option>
                                        <option value="Igbinedion University">Igbinedion University</option>
                                        <option value="Afe Babalola University">Afe Babalola University</option>
                                        <option value="Landmark University">Landmark University</option>
                                        <option value="Bells University of Technology">Bells University of Technology</option>
                                        <option value="American University of Nigeria">American University of Nigeria</option>
                                        <option value="Others">Others</option>
                                    </Field>
                                </Form.Group>
                                <div className={classes.Padded}>

                                    <Form.Group controlId="formName" >
                                        <Form.Label>University (Other):</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="otherUndergradUniversity"
                                            placeholder="Other University Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.otherUndergradUniversity}
                                            className={touched.otherUndergradUniversity && errors.otherUndergradUniversity ? "error" : null}
                                        />
                                        {touched.otherUndergradUniversity && errors.otherUndergradUniversity ? (
                                            <div className="error-message">{errors.otherUndergradUniversity}</div>
                                        ) : null}
                                    </Form.Group>
                                </div>
                                <div className={classes.GenderDiv}>
                                    <p>Graduation Date (mm/dd/yy)</p>
                                    <DatePickerField name="gradDate"
                                        value={values.gradDate}
                                        placeholder="Graduation Date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.gradDate && errors.gradDate ? "error" : null}
                                        date
                                    />
                                </div>
                            </div>

                            <div className={classes.StateOrigin}>
                            </div>
                            <Form.Group controlId="formName">
                                <Form.Label> Course of Study</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="courseOfStudy"
                                    placeholder="Course of Study"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.courseOfStudy}
                                    className={touched.courseOfStudy && errors.courseOfStudy ? "error" : null}
                                />
                                {touched.courseOfStudy && errors.courseOfStudy ? (
                                    <div className="error-message">{errors.courseOfStudy}</div>
                                ) : null}
                            </Form.Group>


                            <div className={classes.NameDeg}>
                                <p style={{ paddingTop: '15px' }}>Class of Degree</p>
                                <Form.Group className="mb-2 " controlId="formBasicText">
                                    <Field style={{ height: 'min-content' }} name="classOfDegree" as="select" className="select is-fullwidth">
                                        <option disabled selected>Select Class of Degree</option>
                                        <option value="FirstClass">First Class</option>
                                        <option value="Second Class Upper">Second Class Upper </option>
                                        <option value="Second Class Lower">Second Class Lower </option>
                                        <option value="Third Class">Third Class </option>
                                        <option value="Pass">Pass </option>
                                    </Field>
                                </Form.Group>
                            </div>
                        </div>
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
                                        <Field style={{ height: 'min-content' }} name="mastersUniversity" as="select" className="select is-fullwidth">
                                            <option disabled selected value="">Select Masters University</option>
                                            <option value="University of Lagos"> University of Lagos</option>
                                            <option value="University of Nigeria">University of Nigeria</option>
                                            <option value="Obafemi Awolowo University">Obafemi Awolowo University</option>
                                            <option value="University of Port Harcourt">University of Port Harcourt</option>
                                            <option value="University of Ilorin">University of Ilorin</option>
                                            <option value="Ahmadu Bello University">Ahmadu Bello University</option>
                                            <option value="University of Benin">University of Benin</option>
                                            <option value="Bayero University Kano">Bayero University Kano</option>
                                            <option value="University of Jos">University of Jos</option>
                                            <option value="Usmanu Danfodio University">Usmanu Danfodio University</option>
                                            <option value="University of Maiduguri">University of Maiduguri</option>
                                            <option value="University of Ilorin">University of Ilorin</option>
                                            <option value="Rivers State University">Rivers State University</option>
                                            <option value="American University of Nigeria">Federal University of Technology, Owerri</option>
                                            <option value="Federal University of Technology, Owerri">Imo State University</option>
                                            <option value="Enugu State University of Science and Technology">Enugu State University of Science and Technology</option>
                                            <option value="Federal University of Technology, Akure">Federal University of Technology, Akure</option>
                                            <option value="Abia State University">Abia State University</option>
                                            <option value="Adekunle Ajasin University">Adekunle Ajasin University</option>
                                            <option value="Federal University of Technology, Minna">Federal University of Technology, Minna</option>
                                            <option value="Ekiti State University, Ado Ekiti">Ekiti State University, Ado Ekiti</option>
                                            <option value="Olabisi Onabanjo University">Olabisi Onabanjo University</option>
                                            <option value="Lagos State University">Lagos State University</option>
                                            <option value="University of Agriculture, Makurdi">University of Agriculture, Makurdi</option>
                                            <option value="Ladoke Akintola University of Technology">Ladoke Akintola University of Technology</option>
                                            <option value="Covenant University">Covenant University</option>
                                            <option value="Babcock University">Babcock University</option>
                                            <option value="Joseph Ayo Babalola University">Joseph Ayo Babalola University</option>
                                            <option value="Bowen University">Bowen University</option>
                                            <option value="Redeemer's University Nigeria">Redeemer's University Nigeria</option>
                                            <option value="Igbinedion University">Igbinedion University</option>
                                            <option value="Afe Babalola University">Afe Babalola University</option>
                                            <option value="Landmark University">Landmark University</option>
                                            <option value="Bells University of Technology">Bells University of Technology</option>
                                            <option value="American University of Nigeria">American University of Nigeria</option>
                                            <option value="Others">Others</option>
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
                                    name="mastersUniversityOther"
                                    placeholder="Type in Other"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.mastersUniversityOther}
                                    className={touched.mastersUniversityOther && errors.mastersUniversityOther ? "error" : null}
                                />
                                {touched.mastersUniversityOther && errors.mastersUniversityOther ? (
                                    <div className="error-message">{errors.mastersUniversityOther}</div>
                                ) : null}
                            </Form.Group>
                            <div className={classes.GenderDiv}>
                                <p>Masters Graduation Date</p>
                                <DatePickerField name="mastersGradDate"
                                    value={values.gradDate}
                                    placeholder="Masters Graduation Date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.gradDate && errors.gradDate ? "error" : null}
                                    date
                                />
                            </div>
                        </div>

                        <div className="BlackDicContainer" style={{ paddingTop: '20px', paddingBottom: '20px' }}>

                            <BlackDiv
                                text="NYSC"
                            />
                        </div>
                        <div className={classes.GenderDOB}>

                            <div className="GenderDiv">
                                <p>Have you Completed NYSC?</p>
                                <Form.Group className="mb-2 " controlId="formBasicText">
                                    <Field style={{ height: 'min-content' }} name="nysc" as="select" className="select is-fullwidth">
                                        <option disabled value="" selected>Select Option</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Field>
                                </Form.Group>
                            </div>
                            <div className={classes.GenderDiv}>
                                <p>(If Yes) Pass Out Date:</p>
                                <DatePickerField name="nyscDate"
                                    value={values.nyscDate}
                                    placeholder="NYSC pass out Date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.nyscDate && errors.nyscDate ? "error" : null}
                                    date
                                    placeholderText="Click to select date"
                                />
                            </div>
                        </div>

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