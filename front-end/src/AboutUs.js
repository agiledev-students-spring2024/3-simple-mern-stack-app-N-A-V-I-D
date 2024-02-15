import { useState, useEffect } from 'react'
import axios from 'axios'
/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const About = props => {
    const [bio, setBio] = useState([])
    const [pic, setPic] = useState([])

    const fetchBio = () => {
        // setMessages([])
        // setLoaded(false)
        axios
          .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
          .then(response => {
            // axios bundles up all response data in response.data property
            const bio = response.data.html_about_me
            setBio(bio)
            const pic = response.data.photo_of_me
            console.log(pic)
            setPic(pic)
          })
          .catch(err => {
            const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
          })
        //   .finally(() => {
        //     // the response has been received, so remove the loading icon
        //     setLoaded(true)
        //   })
      }

      useEffect(() => {
        fetchBio()
      })

  return (
    <>
        {bio}
        <img src = {`${process.env.REACT_APP_SERVER_HOSTNAME}${pic}`} />
 
    </>
  )
}

// make this component available to be imported into any other file
export default About