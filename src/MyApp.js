import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


/*
const characters = [
    {
      name: 'Charlie',
      job: 'Janitor',
    },
    {
      name: 'Mac',
      job: 'Bouncer',
    },
    {
      name: 'Dee',
      job: 'Aspring actress',
    },
    {
      name: 'Dennis',
      job: 'Bartender',
    },
];
*/

function MyApp() {

  const [characters, setCharacters] = useState([]);;

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated);
    }

    function updateList(person) { 
      makePostCall(person).then( result => {
      if (result && result.status === 201){
        const person = result.data;
        setCharacters([...characters, person] );
      }
         
      });
   }

    // an ansync function: makes an await call to our backend, it's non-blocking, allowing our frontend to run other threads
    // as needed until we receive access to the data from the response object and return it to the caller (in this case the frontend)
  async function fetchAll(){
    try{
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch(error){
      //not handling errors rn, just logging them into the console
      console.log(error);
      return false;
  }}

    //similar to fetchAll function, makes a POST request and returns the respon
    async function makePostCall(person){
      try{
        const response = await axios.post('http://localhost:5000/users', person);
        console.log(response);
        return response;
      }
      catch(error){
        console.log(error);
        return false;
      }
    }

  // myApp component call to the fetchAll to set the component state and ultimately render the table with the fetched data
  // ** we only want the fetch all function to be called once to build the data for the first time, after called once, 
  // changes on the table should be handled by adding or removing characters from the state and not fetching all the data again.

  useEffect(() => {
    fetchAll().then( result => {
      if(result)
        setCharacters(result);
    });

  }, []);

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />
        <Form handleSubmit = {updateList} />
        
      </div>
    )
}

export default MyApp;
