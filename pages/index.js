import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(propriedades) {

  return (
    <Box as="aside">
      <img style={{ borderRadius: '100px' }} src={`https://github.com/${propriedades.githubUser}.png`}></img>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsList(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.slice(0, 6).map((username, key) => {
          return (
            <li key={key}>
              <a href={propriedades.title == "Amigos"
                ? `https://github.com/${username.login}.png`
                : `/comunidades/${username.title}`}
                key={username.login}>

                <img src={propriedades.title == "Amigos"
                  ? `https://github.com/${username.login}.png`
                  : username.image} />

                <span>{propriedades.title == "Amigos"
                  ? username.login
                  : username.title}
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      {propriedades.items.length > 6 ? <a href="/amigos">Ver mais</a> : ""}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const [comunidades, setComunidades] = React.useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = 'monicahillman';
  const friendsList = ['juunegreiros', 'peas',
    'omariosouto', 'rafaballerini', 'marcobrunodev',];

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch('https://api.github.com/users/monicahillman/followers')
      .then(function (serverResponse) {
        return serverResponse.json()
      })
      .then(function (response) {
        setSeguidores(response)
      })
  }, [])


  return (
    <>
      <AlurakutMenu />
      <MainGrid>

        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo (a), Mônica!
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();

              const dataForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                title: dataForm.get('title'),
                image: dataForm.get('image'),
              }

              const comunidadesAtualizadas =
                [...comunidades,
                  comunidade]

              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  area-label="Qual vai ser o nome da sua comunidade?"
                  type="text" />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  area-label="Coloque uma URL para usarmos de capa" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsList title="Amigos" items={seguidores} />
          <ProfileRelationsList title="Comunidades" items={comunidades} />

        </div>
      </MainGrid>
    </>
  )
}
