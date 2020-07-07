import React, {useState, useRef} from 'react';
import Main from './components/Main'
import './App.css';

let editData = null;
  

function App() {
  const [books, setBooks] = useState([]);
  const [detial, setDetial] = useState(null)
  const form = useRef(); 

  // form submition
  function handleSubmit(e) {
    e.preventDefault();

    const id = Date.now(),
          name = e.target[0].value,
          author = e.target[1].value,
          desc = e.target[2].value,
          photo = e.target[3].files[0];

    // validation 
    if(!name|!author) return alert('enter name and author')
  
    //new book object
    const book = {name, author, desc, photo, id};

    //check for edit or first submission
    if(editData) {
      const newSet = [...books]
      newSet[editData.id] = book
      setBooks(newSet)

    }else setBooks([...books, book])

    //clear input fields and edit data if any
    form.current.reset()
    editData =null;
  }

  // editing data
  // function handleEdit(id) {
  //   editData = {id};
  //   const data = books[id];
  //     const {name, author, desc, photo} = data;
    
  //     form.current[0].value = name;
  //     form.current[1].value = author;
  //     form.current[2].value = desc;
  //     form.current[3].value = photo;
  // }

  // deleting data
  function handleDelete(id) {
      const newSet = [...books]
      newSet.splice(id, 1)
      setBooks([...newSet]);  
  }

  //close detial page
  function close() {
    setDetial(null)
  }

  // activating detail page
  function view(id) {
    setDetial(books[id])
  }

  return (
    <div  >
      <Main data={detial} close={close} />
      <div className={detial?' event': ''} >

      <div className="nav">
        <h1>React Book Library</h1>
      </div>

      <div className="book-form" >
        <form onSubmit={handleSubmit} ref={form}>
          <label htmlFor="book-name">Name</label><br/>
          <input type="text" id="book-name" />
          
          <label htmlFor="book-author">Author</label><br/>
          <input type="text" id="book-author" />
          
          <label htmlFor="description">Description</label><br/>
          <textarea  id="description"></textarea>
          
          <label htmlFor="image">Upload Image</label><br/>
          <input type="file" accept="image/*" id="image"/>
          <br/><br/>
          
          <input type="submit" value="submit" />
        </form>
      </div>
      
      <div className="book-list">
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  
         {books.map((book, i) => <Row key={book.id} num={i+1} data={book} view={view} del={handleDelete}  />)}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
}

export default App;

function Row(props) {
  const { data, num, del, view } = props 
  
  return (
    <tr>
      <td>{num? num:''}</td>
      <td> {data.name} </td>
      <td> {data.author} </td>
      <td className="action">
        <button className="view-btn" onClick={()=>view(num-1)} >view</button>
        <button className="edit" >edit</button>
        <button className="delete" onClick={()=>del(num-1)}>delete</button>
      </td>
    </tr>
  )
}