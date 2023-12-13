function Input(props) {
	return (
		<input
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.onChange}
			name={props.name}
		></input>
	)
}

export default Input