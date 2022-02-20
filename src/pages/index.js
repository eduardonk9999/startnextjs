import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribleButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

export default function Home({product}) {

  console.log(product)
  return (
    <>
     <Head>
       <title>Home</title>
     </Head>
     <main className={styles.contentContainer}>
       <section className={styles.hero}>
        <span>👋 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Ger access to all the publications <br />
          <span>for $9.90 month</span>
        </p>
        <SubscribeButton />
       </section>
       <img src="/images/avatar.svg" alt="Girl coding" />
     </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1KVJ13HmpWlIeegp1HEdBXKX', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  }

  return {
    props: {
      product
    }
  }
}