import React, { useState, useEffect } from 'react';
import Select from './UseSelect';
import Input from './Input';
function App() {
	const [region, setRegion] = useState([]);
	const [provincia, setProvincia] = useState([]);
	const [ciudad, setCiudad] = useState([]);
	const [calle, setCalle] = useState([]);

	//const [itemSelect, setItemSelect] = useState([]);
	const [regionSelected, setRegionSelect] = useState(null);
	const [provinciaSelected, setProvinciaSelect] = useState(null);
	const [ciudadSelected, setCiudadSelect] = useState(null);

	const [input, setInput] = useState({
		nombre: '',
		id_ciudad: '',
	})

	//UseFetch('http://127.0.0.1:8000/api/direccion', setRegion)
	//UseFetch('http://127.0.0.1:8000/api/direccion/1/provincia', setProvincia)
	//UseFetch('http://127.0.0.1:8000/api/direccion/1/ciudad', setCiudad)
	//UseFetch('http://127.0.0.1:8000/api/direccion/1/calle', setCalle)

	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/direccion')
			.then(response => response.json())
			.then(data => setRegion(data))
			.catch(error => console.log(error))
		return () => {
			setRegion([])
			setProvincia([])
			setCiudad([])
			setCalle([])
		}
	}, [])

	useEffect(() => {
		regionSelected &&
			fetch(`http://127.0.0.1:8000/api/direccion/${regionSelected}/provincia`)
				.then(response => response.json())
				.then(data => setProvincia(data))
				.catch(error => console.log(error))
		return () => {
			setProvincia([])
			setCiudad([])
			setCalle([])
		}
	}, [regionSelected])

	useEffect(() => {
		provinciaSelected &&
			fetch(`http://127.0.0.1:8000/api/direccion/${provinciaSelected}/ciudad`)
				.then(response => response.json())
				.then(data => setCiudad(data))
				.catch(error => console.log(error))
		return () => {
			setCiudad([])
			setCalle([])
		}
	}, [provinciaSelected])

	useEffect(() => {
		ciudadSelected &&
			fetch(`http://127.0.0.1:8000/api/direccion/${ciudadSelected}/calle`)
				.then(response => response.json())
				.then(data => setCalle(data))
				.catch(error => console.log(error))
		return () => setCalle([])
	}, [ciudadSelected])

	function handleSelect(event) {
		const { name, value } = event.target
		name === 'region' && setRegionSelect(value)
		name === 'provincia' && setProvinciaSelect(value)
		name === 'ciudad' && setCiudadSelect(value)
		name === 'ciudad' &&
			setInput((prev) => {
				return {
					...prev,
					id_ciudad: value,
				}
			})
		// setItemSelect((prev) => {
		// 	return {
		// 		...prev,
		// 		[name]: value
		// 	}
		// })
	}

	function handleOnchange(event) {
		const { value } = event.target
		setInput((prev) => {
			return {
				...prev,
				nombre: value
			}
		})
	}

	function handleSubmit() {
		fetch(`http://127.0.0.1:8000/api/calle`, (
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(input)
			}
		))
			.then(response => response.json())
			.then(data => console.log('nueva calle ingresada', data))
	}

	return (
		<div className="main">
			<h1>App Direcciones</h1>
			<div className='leftSide'>
				<label htmlFor="region">Region</label>
				<Select
					onChange={handleSelect}
					id='region'
					name='region'
					data={region}>
				</Select>

				<label htmlFor="provincia">Provincia</label>
				<Select
					onChange={handleSelect}
					id='provincia'
					name='provincia'
					data={provincia}>
				</Select>

				<label htmlFor="ciudad">Ciudad</label>
				<Select
					onChange={handleSelect}
					id='ciudad'
					name='ciudad'
					data={ciudad}>
				</Select>
			</div>

			<div className='rightSide'>
				<ul>
					<li>
						<h4>Calle por region</h4>
					</li>
					{calle.map((item, idx) => {
						return (
							<li key={idx}>{item.nombre}</li>
						)
					})}
				</ul>
			</div>

			<div className='form'>
				<div>
					<h2>Ingresar Calle</h2>
					<label htmlFor="calle">Calle</label>
					<Input
						type='text'
						placeholder='Nombre Calle'
						onChange={handleOnchange}
						name='calle'
					/>

				</div>

				<div>
					<button onClick={handleSubmit}>Crear Calle Nueva</button>
					<button>Buscar Calle</button>
					<button>Editar</button>
					<button>Eliminar</button>
				</div>
			</div>
		</div>

	);
}

export default App;