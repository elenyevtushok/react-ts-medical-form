import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';

type MedicalFormData = {
	firstName: string;
	lastName: string;
	age: number;
	gender: Gender;
	contactNumber: string;
	email: string;
	conditions: string[];
	symptoms: string[];
	medication: boolean;
	allergies: boolean;
	smoking: boolean;
	alcohol: AlcoholConsuming;
}

enum Gender { Male, Female, Other };

enum Conditions { Asthma, Cardiac_disease, Hypertension, Epilepsy, Cancer, Diabetes, Psychiatric_disorder, Other }
enum Symptoms { Chest_pain, Hematological, Gastrointestinal, Musculoskeletal, Respiratory, Lymphatic, Genitourinary, Cardiological, Neurological, Weight_gain, Weight_loss, Psychiatric, Other }
enum AlcoholConsuming { Daily, Weekly, Monthly, Ocasionally, Never }

const INITIAL_DATA: MedicalFormData = {
	firstName: "",
	lastName: "",
	age: 0,
	gender: 0,
	contactNumber: "",
	email: "",
	conditions: [],
	symptoms: [],
	medication: false,
	allergies: false,
	smoking: false,
	alcohol: 0,
}

function App(dto: MedicalFormData) {
	const [data, setData] = useState(INITIAL_DATA);
	console.log(data)


	const updateFields = (fields: Partial<MedicalFormData>) => {
		setData(prev => {
			return { ...prev, ...fields }
		})
	}

	return (
		<Container>
			<h1>Medical History Form</h1>
			<Form>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="input_firstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								value={dto.firstName}
								onChange={e => { updateFields({ firstName: e.target.value }); console.log(data) }}
							/>
							<Form.Text className="text-muted">
								First Name
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="input_age">
							<Form.Label>What is your age?</Form.Label>
							<Form.Control
								placeholder="ex: 23"
								type="number"
								value={dto.age}
								onChange={e => { updateFields({ age: e.target.value }); console.log(data) }}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="input_contactNumber">
							<Form.Label>Contact Number</Form.Label>
							<Form.Control
								placeholder="Enter phone number"
								type="text"
								value={dto.contactNumber}
								onChange={e => { updateFields({ contactNumber: e.target.value }); console.log(data) }}
							/>
							<Form.Text className="text-muted">
								(000) 000-0000
							</Form.Text>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="input_lastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								value={dto.lastName}
								onChange={e => { updateFields({ lastName: e.target.value }); console.log(data) }}
							/>
							<Form.Text className="text-muted">
								Last Name
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="gender_select" className="mb-3" >
							<Form.Label>What is your gender?</Form.Label>
							<Form.Select className='select' onChange={(e) => { updateFields({ gender: Gender[e.target.value as keyof typeof Gender] }) }}>
								<option>Please Select</option>
								{Object.keys(Gender)
									.filter((k: string) => !isNaN(Number(k)))
									.map((k: string) => Number(k))
									.map((i: number) => <option key={Gender[i]} value={dto.gender}>{Gender[i]}</option>)
								}
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="input_email">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								value={dto.email}
								placeholder="Enter email"
								onChange={e => { updateFields({ email: e.target.value }); console.log(data) }}
							/>
							<Form.Text className="text-muted">
								example@example.com
							</Form.Text>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="conditions_multiple_select" className="mb-3">
					<Form.Label>Check the conditions that apply to you or any member of your immediate relatives:</Form.Label>
					<Form.Control as="select" multiple value={data.conditions} onChange={e => updateFields({ conditions: [].slice.call(e.target.selectedOptions).map(item => item.value) })}>
						{Object.keys(Conditions)
							.filter((k: string) => !isNaN(Number(k)))
							.map((k: string) => Number(k))
							.map((i: number) => <option key={Conditions[i]} value={Conditions[i]} >{Conditions[i]}</option>)
						}
					</Form.Control>
					<Form.Text className="text-muted">
						use Ctrl or Command to choose multiple options
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="symptoms_multiple_select" className="mb-3">
					<Form.Label>Check the symptoms that you' re currently experiencing:</Form.Label>
					<Form.Control as="select" multiple value={data.symptoms} onChange={e => updateFields({ symptoms: [].slice.call(e.target.selectedOptions).map(item => item.value) })}>
						{Object.keys(Symptoms)
							.filter((k: string) => !isNaN(Number(k)))
							.map((k: string) => Number(k))
							.map((i: number) => <option key={Symptoms[i]} value={Symptoms[i]} >{Symptoms[i]}</option>)
						}
					</Form.Control>
					<Form.Text className="text-muted">
						use Ctrl or Command to choose multiple options
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="taking_medicines_radio_buttons" className="mb-3">
					<Form.Label className="radio-buttons-header">Are you currently taking any medication?
					</Form.Label>
					<Form.Check
						inline
						label="Yes"
						value="Yes"
						name="medication"
						type={'radio'}
						onChange={(e) => { updateFields({ medication: true }); console.log(data) }}
					/>
					<Form.Check
						defaultChecked
						inline
						label="No"
						value="No"
						name="medication"
						type={'radio'}
						onChange={(e) => updateFields({ medication: false })}
					/>
				</Form.Group>
				<Form.Group controlId="allergies_radio_buttons" className="mb-3">
					<Form.Label className="radio-buttons-header">Do you have any medication allergies?
					</Form.Label>
					<Form.Check
						inline
						label="Yes"
						value="Yes"
						name="allergies"
						type={'radio'}
						onChange={(e) => { updateFields({ allergies: true }); console.log(data) }}
					/>
					<Form.Check
						defaultChecked
						inline
						label="No"
						value="No"
						name="allergies"
						type={'radio'}
						onChange={(e) => updateFields({ allergies: false })}
					/>
				</Form.Group>
				<Form.Group controlId="smoking_radio_buttons" className="mb-3">
					<Form.Label className="radio-buttons-header">Do you smoke?
					</Form.Label>
					<Form.Check
						inline
						label="Yes"
						value="Yes"
						name="smoking"
						type={'radio'}
						onChange={(e) => { updateFields({ smoking: true }); console.log(data) }}
					/>
					<Form.Check
						defaultChecked
						inline
						label="No"
						value="No"
						name="smoking"
						type={'radio'}
						onChange={(e) => updateFields({ smoking: false })}
					/>
				</Form.Group>
				<Form.Group controlId="alcohol_consum_select" className="mb-3" >
					<Form.Label>How often do you consume alcohol?</Form.Label>
					<Form.Select className='select' onChange={(e) => { updateFields({ alcohol: AlcoholConsuming[e.target.value as keyof typeof AlcoholConsuming] }) }}>
						<option>Please Select</option>
						{Object.keys(AlcoholConsuming)
							.filter((k: string) => !isNaN(Number(k)))
							.map((k: string) => Number(k))
							.map((i: number) => <option key={AlcoholConsuming[i]} value={dto.alcohol}>{AlcoholConsuming[i]}</option>)
						}
					</Form.Select>
				</Form.Group>
				<Form.Group controlId="submit_button_terms" className="mt-5 text-center" >
					<Button className="mb-3 submit-button" size="lg" variant="primary">Submit</Button>
					<Form.Text className="text-muted">
						By pressing Submit you agree with our
						<a href="#">{" "}terms and conditions</a>
					</Form.Text>
				</Form.Group>
			</Form>
		</Container>
	)
}

export default App
