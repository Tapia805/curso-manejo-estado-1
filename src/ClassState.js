import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
 constructor(props) {
   super(props);

   this.state = {
     value: '',
     error: false,
     loading: false,
   };
 }

 componentDidUpdate() {
  if (!!this.state.loading) {
    setTimeout(() => {
      if (SECURITY_CODE === this.state.value) {
        this.setState({ error: false, loading: false });
      } else {
        this.setState({ error: true, loading: false });
      } 
    }, 3000);
  }
 }
 
 render() {
   return (
     <div>
       <h2>Eliminar {this.props.name}</h2>

       <p>Por favor, escribe el codigo de seguridad.</p>

       {(this.state.error && !this.state.loading) && (<p>Error: el codigo es incorrecto</p>)}

       {this.state.loading && (<Loading />)}

       <input 
         placeholder='codigo de seguridad'
         value={this.state.value}
         onChange={(event) => {
          this.setState({ value: event.target.value })
         }}
       />

       <button onClick={() => this.setState({loading: true})} >Comprobar</button>
     </div>
   );
 }
}

  export { ClassState };