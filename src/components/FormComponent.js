import React from 'react'
import classes from './FormComponent.module.css'
import { Form, Button } from 'react-bootstrap'
// import { useState } from 'react'
const FormComponent = () => {

    // const [data, setData] = useState([]);

    // const handleSubmit = (data) => {
    //     console.log(data)

    // }
    // const handleChange = () => {
    //     console.log(data)

    // }

    return (
        <div>

            <Form>

                <div className={classes.Name}>

                    <Form.Group className="mb-2"
                        controlId="formBasicText"
                    >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" />

                    </Form.Group>
                    <Form.Group className="mb-2 " controlId="formBasicText">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Middle Name" />

                    </Form.Group>
                    <Form.Group className="mb-2 " controlId="formBasicText">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" />

                    </Form.Group>

                </div>
                <div className={classes.NameInfo}>

                    <Form.Text className="text-muted">
                        Name as it appears on your university and NYSC documents
                    </Form.Text>
                </div>

                <div className={classes.GenderDOB}>

                    <Form.Group className="mb-2 " controlId="formBasicText">
                        <Form.Label>Gender</Form.Label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </Form.Group>

                    <Form.Group controlId="doj">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="doj"
                            placeholder="Date of Birth"
                        />
                    </Form.Group>


                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />

                </Form.Group>


                <div className={classes.StateOrigin}>
                    <Form.Group className="mb-2 " controlId="formBasicText">
                        <Form.Label>State of Origin</Form.Label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>State of Origin</option>
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
                        </select>
                    </Form.Group>

                    <Form.Group className="mb-2 " controlId="formBasicText">
                        <Form.Label>State of Residence</Form.Label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>State of Residence</option>
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
                        </select>
                    </Form.Group>
                </div>
                <div className={classes.NameInfo}>

                    <Form.Text className="text-muted">
                        Education
                    </Form.Text>
                </div>

                <div className={classes.University}>


                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>University</Form.Label>
                        <select class="form-select" aria-label="Default select example">
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

                        </select>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Others</Form.Label>
                        <Form.Control type="text" placeholder="Enter University Name" />

                    </Form.Group>

                </div>




                <div className={classes.Name}>

                    <Form.Group className="mb-2 " controlId="formBasicText">
                        <Form.Label>Highest Degree</Form.Label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Degree</option>
                            <option value="octor of Philosophy">Doctor of Philosophy (PhD)</option>
                            <option value="Masters">Masters</option>
                            <option value="Undergraduate">Undergraduate</option>
                        </select>
                    </Form.Group>

                </div>


                <div className={classes.NameInfo}>

                    <Form.Text className="text-muted">
                        Undergraduate Information
                    </Form.Text>
                </div>

                <div className={classes.StateOrigin}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>University</Form.Label>
                        <Form.Control type="name" placeholder="Enter University Name" />
                    </Form.Group>
                    <Form.Group controlId="doj">
                        <Form.Label>Graduation Date</Form.Label>
                        <Form.Control
                            type="month"
                            name="doj"
                            placeholder="Graduation Date"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Course of Study</Form.Label>
                        <Form.Control type="name" placeholder="Enter Course of Study" />
                    </Form.Group>

                    <Form.Group className="mb-2 " controlId="formBasicText">
                        <Form.Label>Class of Degree</Form.Label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Select Class of Degree</option>
                            <option value="FirstClass">First Class</option>
                            <option value="Female">Second Class Upper </option>
                            <option value="Female">Second Class Lower </option>
                            <option value="Female">Third Class </option>
                            <option value="Female">Pass </option>

                        </select>
                    </Form.Group>
                </div>
                <div className={classes.NameInfo}>

                    <Form.Text className="text-muted">
                        Masters Information (Skip if not applicable)
                    </Form.Text>
                </div>


                <div className={classes.StateOrigin}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>University</Form.Label>
                        <Form.Control type="name" placeholder="Enter University Name" />
                    </Form.Group>
                    <Form.Group controlId="doj">
                        <Form.Label>Graduation Date</Form.Label>
                        <Form.Control
                            type="month"
                            name="doj"
                            placeholder="Graduation Date"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Course of Study</Form.Label>
                        <Form.Control type="name" placeholder="Enter Course of Study" />
                    </Form.Group>


                </div>




                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>    </div>
    )
}

export default FormComponent