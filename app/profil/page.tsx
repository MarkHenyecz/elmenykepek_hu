import AvatarElem from '@/components/avatar/avatar'
import '../../components/scss/profile.scss'
import PostElem from '@/components/post/post'
import Image from 'next/image'

export default function Profile() {
  return (
    <main>
      <AvatarElem width={190} height={190} />
      <h1>flakszxd</h1>
      <div className='divider' />
      <h1>Karakterek</h1>
      
    </main>
  )
}
