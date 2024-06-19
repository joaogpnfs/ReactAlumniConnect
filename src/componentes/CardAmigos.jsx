import React from 'react'
import {Link} from 'react-router-dom'
import {SemPerfil} from '../assets'

const CardAmigos = ({amigos}) => {
    return(
        <div>
            <div className=' w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
                <div className=' flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]'>
                    <span>Amigos</span>
                    <span>{amigos?.length}</span>
                </div>

                <div className='w-full flex flex-col gap-4 pt-4'>
                    {
                        amigos?.map((amigo) =>(
                            <Link to={'/Perfil/' +amigo?._id}
                            key={amigo?._id}
                            className = 'w-full flex gap-4 items-center cursor-pointer'
                            >
                                <img src={amigo?.perfilUrl ?? SemPerfil} alt={amigo?.primeiroNome}
                                
                                className=' w-10 h-10 object-cover rounded-full'
                                />
                                <div className='flex-1'>
                                    <p className='text-base font-medium text-ascent-1'>
                                        {amigo?.primeiroNome} {amigo?.sobrenome}
                                    </p>
                                    <span className ='text-sm text-ascent-2'>
                                        {amigo?.profissao ?? "Sem Profissão"}
                                    </span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CardAmigos;