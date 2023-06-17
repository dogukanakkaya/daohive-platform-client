'use client'
import Image from 'next/image'
import Button, { Variant } from '@/app/components/Button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })

    if (!error) router.refresh()
  }

  const handleSignUp = async () => {
    const { data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    })

    // if (data.session) router.refresh()
    console.log(JSON.stringify(data))
  }

  const handleSignIn = async () => {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (data.session) router.push('/')
  }

  return (
    <div className="bg-cover bg-no-repeat bg-[url('/light-login.jpg')] dark:bg-[url('/dark-login.jpg')]">
      <main className="flex-center h-[calc(100vh-theme('spacing.40'))] flex-col">
        <div className="flex-center w-11/12 sm:w-3/5 xl:w-4/12">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full">
            <div className="p-5 flex flex-col items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                className="w-[50px] h-14 dark:invert"
                width={100}
                height={100}
                priority
              />
              <div className="flex flex-col space-y-2 mt-5">
                <Button variant={Variant.SignInWith} className="shadow-md flex items-center gap-4 rounded">
                  <Image
                    className="relative"
                    src="/metamask.svg"
                    alt="Sign in with GitHub"
                    width={32}
                    height={32}
                    priority
                  />
                  Connect with MetaMask
                </Button>
                <Button onClick={signInWithGoogle} variant={Variant.SignInWith} className="shadow-md flex items-center gap-4 rounded">
                  <Image
                    className="relative"
                    src="/google.svg"
                    alt="Sign in with Google"
                    width={32}
                    height={32}
                    priority
                  />
                  Sign in with Google
                </Button>
                <Button variant={Variant.SignInWith} className="shadow-md flex items-center gap-4 rounded">
                  <Image
                    className="relative"
                    src="/github.svg"
                    alt="Sign in with GitHub"
                    width={32}
                    height={32}
                    priority
                  />
                  Sign in with GitHub
                </Button>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <label className="form-label"><i className="bi bi-envelope"></i> E-Mail</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-input" type="email" name="email" placeholder="info@daohive.io" required autoFocus autoComplete="email" />
              </div>
              <div className="mb-4">
                <label className="form-label"><i className="bi bi-key"></i> Password</label>
                <div className="relative">
                  <input value={password} onChange={e => setPassword(e.target.value)} className="form-input" type={showPassword ? 'text' : 'password'} name="password" placeholder="********" required autoComplete="current-password" />
                  <span className="w-20 text-sm flex-center gap-2 absolute z-40 right-0 top-0 block p-2 h-full cursor-pointer hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'} <i className={`bi bi-${showPassword ? 'eye-slash' : 'eye'}`}></i></span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <a href="#" className="text-blue-400 hover:text-blue-500">Forgot password?</a>
                <div className="flex items-center gap-2">
                  <Button onClick={handleSignUp} variant={Variant.Secondary}><i className="bi bi-person-add"></i> Sign Up</Button>
                  <Button onClick={handleSignIn}>Sign in <i className="bi bi-box-arrow-in-right"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="flex items-center justify-evenly h-40 p-4 bg-white dark:bg-black shadow-inner text-center lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Lorem ipsum dolor sit amet.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit.
          </p>
        </a>
      </div>
    </div>
  )
}
