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
        {/* {propriedades.items.map((username) => {
          return (
            <li>
              <a href={`https://github.com/${username.login}.png`} key={username.login}>
                <img src={`https://github.com/${username.login}.png`}></img>
                <span>{username}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
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
        console.log("RESPONSE", seguidores)
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
              Bem vindo (a)!
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

          <Box>
            <h2 className='smallTitle'>
              Comunidades ({comunidades.length})
            </h2>

            <ProfileRelationsBoxWrapper>
              <ul>
                {comunidades.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={`/users/${item.title}`} key={item.title}>
                        <img src={item.image}></img>
                        <span>{item.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          </Box>
          <Box>
            <h2 className='smallTitle'>
              Comunidades ({friendsList.length})
            </h2>

            <ProfileRelationsBoxWrapper>
              <ul>
                {friendsList.map((username) => {
                  return (
                    <li>
                      <a href={`https://github.com/${username}.png`} key={username}>
                        <img src={`https://github.com/${username}.png`}></img>
                        <span>{username}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          </Box>

        </div>
      </MainGrid>
    </>
  )
}
