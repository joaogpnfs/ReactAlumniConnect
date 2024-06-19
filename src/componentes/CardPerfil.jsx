import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsPersonFillAdd,
} from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";
import { SemPerfil } from "../assets";
import { UpdatePerfil } from "../redux/sliceUsuario";

const CardPerfil = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4 '>
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
          <Link to={"/Perfil/" + user?._id} className='flex gap-2'>
            <img
              src={user?.perfilUrl ?? SemPerfil}
              alt={user?.email}
              className='w-14 h-14 object-cover rounded-full'
            />

            <div className='flex flex-col justify-center'>
              <p className='text-lg font-medium text-ascent-1'>
                {user?.primeiroNome} {user?.sobrenome}
              </p>
              <span className='text-ascent-2'>
                {user?.profissao ?? "Sem Profissão"}
              </span>
            </div>
          </Link>

          <div className=''>
            {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className='text-blue cursor-pointer'
                onClick={() => dispatch(UpdatePerfil(true))}
              />
            ) : (
              <button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                onClick={() => {}}
              >
                <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
              </button>
            )}
          </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <div className='flex gap-2 items-center text-ascent-2'>
            <CiLocationOn className='text-xl text-ascent-1' />
            <span>{user?.localizacao ?? "Adicionar Localização"}</span>
          </div>

          <div className='flex gap-2 items-center text-ascent-2'>
            <BsBriefcase className=' text-lg text-ascent-1' />
            <span>{user?.profissao ?? "Adicionar Profissão"}</span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <p className='text-xl text-ascent-1 font-semibold'>
            {user?.amigos?.length} Amigos
          </p>

          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Quem viu seu perfil:</span>
            <span className='text-ascent-1 text-lg'>{user?.visualizacoes?.length}</span>
          </div>

          <span className='text-base text-blue'>
            {user?.verified ? "Conta Verificada" : "Não verificada"}
          </span>

          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Se juntou há </span>
            <span className='text-ascent-1 text-base'>
              {moment(user?.criadoEm).fromNow()}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Grupos: </span>
            <span className='text-ascent-1 text-lg'> 0</span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-4 py-4 pb-6'>
          <p className='text-ascent-1 text-lg font-semibold'>Perfis Sociais</p>

          <div className='flex gap-2 items-center text-ascent-2'>
            <BsInstagram className=' text-xl text-ascent-1' />
            <span>Instagram</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <FaTwitterSquare className=' text-xl text-ascent-1' />
            <span>Twitter</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <BsFacebook className=' text-xl text-ascent-1' />
            <span>Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPerfil;