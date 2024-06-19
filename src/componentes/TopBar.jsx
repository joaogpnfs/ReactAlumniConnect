import React from 'react'
import { TbSocial } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TextInput from './TextInput'
import BotaoCustom from './BotaoCustomizado'
import { useForm } from 'react-hook-form'
import {BsMoon, BsSunFill} from 'react-icons/bs'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {SetTema} from '../redux/tema'
import {Logout} from '../redux/sliceUsuario'

const TopBar = () => {
    const {theme} = useSelector(state=> state.theme)
    const {user} = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const handleSearch = async(dados) => {}

    const handleTema = ()=> {
        const valorTema = theme === "light"? "dark": "light";
        dispatch(SetTema(valorTema))
    }

  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>
        <Link to='/' className='flex gap-2 items-center'>
            <div className= 'p-2 bg-[#065ad8] rounded text-white'>
                <TbSocial />
            </div>
            <span className='text-2xl text-[#065ad8] font-semibold' >
                AlumniConnect
            </span>
        </Link>
        <form
        className='hidden md:flex items-center justify-center'
        onSubmit={handleSubmit(handleSearch)}
        >
        <TextInput
          placeholder='Pesquisar...'
          styles='w-[18rem] lg:w-[38rem]  rounded-l-full py-3 '
          registro={register("search")}
        />
        <BotaoCustom
          title='Pesquisar'
          type='submit'
          containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'
        />
      </form>
      {/* ICONES DA BARRA */}
      <div className ='flex gap-4 items-center text-ascent-1 text-md md:text-xl'>
        <button onClick ={()=> handleTema()}>
            {theme ? <BsMoon/>: <BsSunFill />}
        </button>
        <div className='hidden lg:flex'>
            <IoMdNotificationsOutline />
        </div>
        <div>
            <BotaoCustom
            onClick={() => dispatch(Logout())}
            title='Log Out'
            containerStyles ='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2
            border border-[#666] rounded-full'
            />
        </div>
      </div>
    </div>
    )
}

export default TopBar