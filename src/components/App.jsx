import React, { useState, useEffect } from 'react';
import Select from './UseSelect';
function App() {
	const [region, setRegion] = useState([]);
	const [provincia, setProvincia] = useState([]);
	const [ciudad, setCiudad] = useState([]);
	const [calle, setCalle] = useState([]);

	//const [itemSelect, setItemSelect] = useState([]);
	const [regionSelected, setRegionSelect] = useState(null);
	const [provinciaSelected, setProvinciaSelect] = useState(null);
	const [ciudadSelected, setCiudadSelect] = useState(null);

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
		if (provinciaSelected) {
			fetch(`http://127.0.0.1:8000/api/direccion/${provinciaSelected}/ciudad`)
				.then(response => response.json())
				.then(data => setCiudad(data))
				.catch(error => console.log(error))

			return () => {
				setCiudad([])
				setCalle([])
			}

		}
	}, [provinciaSelected])

	useEffect(() => {
		if (ciudadSelected) {
			fetch(`http://127.0.0.1:8000/api/direccion/${ciudadSelected}/calle`)
				.then(response => response.json())
				.then(data => setCalle(data))
				.catch(error => console.log(error))

			return () => setCalle([])
		}

	}, [ciudadSelected])

	function handleSelect(event) {
		const { name, value } = event.target
		name === 'region' && setRegionSelect(value)
		name === 'provincia' && setProvinciaSelect(value)
		name === 'ciudad' && setCiudadSelect(value)

		// setItemSelect((prev) => {
		// 	return {
		// 		...prev,
		// 		[name]: value
		// 	}
		// })
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
					<label htmlFor="region">Region</label>
					<input type="text" placeholder='Nombre Region' />

					<label htmlFor="provincia">Provincia</label>
					<input type="text" placeholder='Nombre Provincia' />

					<label htmlFor="ciudad">Ciudad</label>
					<input type="text" placeholder='Nombre Ciudad' />

					<label htmlFor="calle">Calle</label>
					<input type="text" placeholder='Nombre Calle' />
				</div>
				<div>

					<button>Buscar</button>
					<button>Editar</button>
					<button>Crear</button>
					<button>Eliminar</button>
				</div>
			</div>
		</div>

	);
}

export default App;