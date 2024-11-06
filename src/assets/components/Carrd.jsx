import React from 'react'
import "./Carrd.css"
import "./Table.css"
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Carrd = () => {
  const [formm, setformm] = useState({ site: "", username: "", passs: "" })
  const [passArray, setpassArray] = useState([])
  useEffect(() => {
    const data = localStorage.getItem("passArray");
    if (data) {
      setpassArray(JSON.parse(data));
    }
  }, []);

  const SavePass = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setpassArray([...passArray, { ...formm, id: uuidv4() }]);
    localStorage.setItem("passArray", JSON.stringify([...passArray, { ...formm, id: uuidv4() }])); // Corrected the localStorage.setItem syntax
    console.log([...passArray, formm]); // This will now log the data correctly
  }
  const delpass = (id) => {
    alert("Deleting..!");
    const updatedPassArray = passArray.filter(item => item.id !== id);
    setpassArray(updatedPassArray);
    localStorage.setItem("passArray", JSON.stringify(updatedPassArray));
  }
  const handelchange = (e) => {
    setformm({ ...formm, [e.target.name]: e.target.value })
  }
  const cpyclick = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("copied to clipboard...!!");
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />
      <div>

        <form class="form" onSubmit={SavePass}>
          <span class="input-span">
            <label for="email" class="label">Website Address</label>
            <input type="text" value={formm.site} onChange={handelchange} placeholder='Enter Web Address' name="site" id="email"></input>
          </span>
          <span class="input-span">
            <label for="username" class="label">username</label>
            <input type="text" value={formm.username} onChange={handelchange} placeholder='Enter username' name="username" id="username"></input>
          </span>
          <span class="input-span">
            <label for="password" class="label">--Password--</label>
            <input type="password" value={formm.passs} onChange={handelchange} placeholder="Enter password" name="passs" id="password" ></input>

          </span>
          <button class="submit" type="submit" onClick={SavePass}>Save</button>

        </form>
      </div>

      <h2 class='op'>Your Passwords</h2>
      {passArray.length === 0 && <h3 class="np">No Passwords Saved</h3>}
      {passArray.length != 0 && <table>
        <thead >
          <tr>
            <th>web--address</th>
            <th>Username</th>
            <th>Saver Password</th>
            <th>Edit</th>
          </tr>
        </thead>
      </table>
      }
      {passArray.map(items => {
        return (
          <tr key={items.username}> {/* It's a good practice to add a unique key */}
            <td class="txx">{items.site} <button class="cpy" onClick={() => cpyclick(items.site)}>c</button></td>
            <td class="txx">{items.username} <button class="cpy" onClick={() => cpyclick(items.username)}>c</button></td>
            <td class="txx">{items.passs} <button class="cpy" onClick={() => cpyclick(items.passs)}>c</button></td>
            <td class="txx"> <button onClick={() => delpass(items.id)}>Delete</button></td>
          </tr>
        );
      })}
    </>
  )
}

export default Carrd
