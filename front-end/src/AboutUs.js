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
        <img src = {pic} />
      {/* <h1>Hi. My name is Navid Chowdhury</h1>
      <p>I am a senior Computer Science student at NYU with a minor in Web Applications. In my spare time I love to read, play videogames, ride my skateboard, and watch various crime shows.
        My favorites include Psych, Leverage, Tulsa King, and currently Snowfall. I typically play videogames on my PC (which was fun to build) but occasionally on other platforms too like my Switch. My favorite games include GTA V, Marvel's Spider-Man, Detroit Become Human, and occasionally Call of Duty. On the Switch I loved the Zelda games. 
      </p>
      <br/>
      <p>
        I also love listening to music. My top artists include Pop Smoke, OneRepublic, Omah Ley, and Maroon 5. My favorite songs are The Monster by Eminem, More Than You Know by Axwell Ingrosso, and Hope by The Chainsmokers. Honorable mentions include Keep You Mine by NOTD and Banlieue by Neima Ezza. I listen to music while doing almost any task and as a result I had over 100,000 minutes worth of music listened to on Spotify this past year. This equates to about 70 days straight.
      </p> */}
    </>
  )
}

// make this component available to be imported into any other file
export default About