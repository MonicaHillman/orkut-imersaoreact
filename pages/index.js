import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(propriedades) {

  return (
    <Box>
      <img style={{ borderRadius: '100px' }} src={`https://github.com/${propriedades.githubUser}.png`}></img>
    </Box>
  )
}

export default function Home() {

  const githubUser = 'monicahillman';
  const friendsList = ['juunegreiros', 'peas', 'omariosouto', 'rafaballerini', 'marcobrunodev'];

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
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da Comunidade ({friendsList.length})
            </h2>
            <ul>
              {friendsList.map((username) => {
                return (
                  <li>
                    <a href={`/users/${username}`} key={username}>
                      <img src={`https://github.com/${username}.png`}></img>
                      <span>{username}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  )
}
