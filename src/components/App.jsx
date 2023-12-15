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

	let direccion = {};

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
		const { name, value } = event.target
		setInput((prev) => {
			return {
				...prev,
				nombre: value
			}
		})
	}

	function CrearCalle() {
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

	const dir = async () => {
		const calle = await fetch(`http://127.0.0.1:8000/api/calle/${input.nombre}`)
		const calleData = await calle.json()
		direccion = {
			...direccion,
			calle: calleData.nombre,
			calleId: calleData.id,
			ciudadId: calleData.id_ciudad,
		}
		const ciudad = await fetch(`http://127.0.0.1:8000/api/ciudad/${direccion.ciudadId}`)
		const ciudadData = await ciudad.json()
		direccion = {
			...direccion,
			ciudad: ciudadData.nombre,
			provinciaId: ciudadData.id_provincia,
		}
		const provincia = await fetch(`http://127.0.0.1:8000/api/provincia/${direccion.provinciaId}`)
		const provinciaData = await provincia.json()
		direccion = {
			...direccion,
			provincia: provinciaData.nombre,
			regionId: provinciaData.id_region,
		}
		const region = await fetch(`http://127.0.0.1:8000/api/provincia/${direccion.provinciaId}`)
		const regionData = await region.json()
		direccion = {
			...direccion,
			region: regionData.nombre,
			regionId: regionData.id_region,
		}
		console.log('direccion buscada', direccion)
		return direccion
	}

	function editarCalle() {
		let calleEdit = {
			nombreNuevo: input.nombre,
			id: direccion.calleId,
		};
		console.log('calle', calleEdit)
		fetch(`http://127.0.0.1:8000/api/calle/${calleEdit.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(calleEdit)
		})
			.then(response => response.json())
			.then(data => console.log('calle editada', data))
	}

	function eliminarCalle() {
		let calleDelete = direccion.calleId;
		fetch(`http://127.0.0.1:8000/api/calle/${calleDelete}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(response => response.json())
			.then(data => console.log('calle eliminada', data))
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
					<h3>primero debe seleccionar una ciudad del select Calle</h3>
					<label htmlFor="calle">Calle</label>
					<Input
						type='text'
						placeholder='Nombre Calle'
						onChange={handleOnchange}
						name='calleCrear'
					/>
					<button onClick={CrearCalle}>Crear Calle Nueva</button>
				</div>

				<div>
					<h3>Buscar Calle</h3>
					<label htmlFor="calle">Calle a buscar</label>
					<Input
						type='text'
						placeholder='Nombre Calle'
						onChange={handleOnchange}
						name='calleBuscar'
					/>
					<button onClick={dir}>Buscar Calle</button>
				</div>
			</div>
		</div>

	);
}

export default App;