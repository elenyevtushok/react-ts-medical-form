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
	conditions: Conditions[]
}

enum Gender { Male, Female, Other };

enum Conditions { Asthma, Cardiac_disease, Hypertension, Epilepsy, Cancer, Diabetes, Psychiatric_disorder, Other }

const INITIAL_DATA: MedicalFormData = {
	firstName: "",
	lastName: "",
	age: 0,
	gender: 0,
	contactNumber: "",
	email: "",
	conditions: []
}

const conditionsArray = Object.keys(Conditions)
	.filter((k: string) => !isNaN(Number(k)))
	.map((k: string) => Number(k));
console.log(conditionsArray)

const middleIndex = Math.ceil(conditionsArray.length / 2);

const dividedConditionsArray = [conditionsArray.splice(0, middleIndex), conditionsArray.splice(-middleIndex)];

function App(dto: MedicalFormData) {
	const [data, setData] = useState(INITIAL_DATA);
	const [selectedOption, setSelectedOption] = useState<String>();

	const updateFields = (fields: Partial<MedicalFormData>) => {
		setData(prev => {
			return { ...prev, ...fields }
		})
	}
	//Handle select options
	const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedOption(value);
		console.log(selectedOption)
	};

	return (
		<Container>
			<h1>Medical History Form</h1>
			<Form>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formBasicText">
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
						<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label>What is your age?</Form.Label>
							<Form.Control
								placeholder="ex: 23"
								type="number"
								value={dto.age}
								onChange={e => { updateFields({ age: e.target.value }); console.log(data) }}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label>Contact Number</Form.Label>
							<Form.Control
								placeholder="(000) 000-0000"
								type="text"
								value={dto.contactNumber}
								onChange={e => { updateFields({ contactNumber: e.target.value }); console.log(data) }}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="formBasicText">
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
						<Form.Group controlId="formGridState" className="mb-3" >
							<Form.Label>What is your gender?</Form.Label>
							<Form.Select className='select' onChange={selectChange}>
								<option>Please Select</option>
								{Object.keys(Gender)
									.filter((k: string) => !isNaN(Number(k)))
									.map((k: string) => Number(k))
									.map((i: number) => <option key={Gender[i]} value={dto.gender}>{Gender[i]}</option>)
								}
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
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

				<h4>
					Check the conditions that apply to you or any member of your immediate relatives:
				</h4>
				<Row>
					{
						dividedConditionsArray.map((conditions, index) => {
							return <Col key={index}>
								{
									conditions.map((i: number) =>
										<Form.Check
											name="conditions_group"
											key={i}
											label={Conditions[i]}
											value={Conditions[i]}
											id={`custom-checkbox-${i}`}

											>

										</Form.Check>)
								}
							</Col>
						})
					}
				</Row>

			</Form>
		</Container>
	)
}

export default App
