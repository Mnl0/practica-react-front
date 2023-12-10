function Select(props) {
	return (
		<select
			id={props.id}
			onChange={props.onChange}
			name={props.name}>
			<option value="">Select</option>
			{props.data.map((item) => {
				return (
					<option
						value={item.id}
						key={item.id}>
						{item.nombre}
					</option>
				)
			})}
		</select>
	)
}
export default Select;