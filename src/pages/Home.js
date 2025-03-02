import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Post from '../components/Post'
import EmployeeSlider from '../components/EmployeeSlider'
import ProgramSlider from '../components/ProgramSlider'
import bannerImage from '../images/kids.jpg'
import { services } from '../library/Constants'
import EmployeeService from '../api/EmployeeService'
import Spin from '../components/Spin'
import { useAppContext } from '../context/AppContext'

const Home = () => {

  const [employees, setEmployees] = useState([])

  const {
    setLoading,
  } = useAppContext()

  useEffect(() => {
    getEmployees()
  }, [])


  const getEmployees = async () => {
    setLoading(true)
    try {
      const result = await EmployeeService.getAllEmployees()
      setEmployees(result.data.employees)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="relative min-h-screen"
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 space-y-10">
        <Banner />
        <div className="max-w-7xl mx-auto px-4">
          <EmployeeSlider employees={employees} />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <ProgramSlider services={services} />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Post />
        </div>
      </div>
    </div>
  )
}

export default Home
