import Layout from '../components/layout'
import { useTheme } from 'next-themes'

const Stats = () => {
  const { theme } = useTheme()
  if (theme != undefined) {
    return (
      <Layout>
        <iframe
          className="bg-primary opacity-0 dark:opacity-100 transition duration-200 hidden dark:flex"
          plausible-embed
          src={`https://stats.willit.fail/share/jcde.xyz?auth=Pqr0XnPWh6LTTlO6WjmEC&embed=true&background=transparent&theme=dark`}
          scrolling="no"
          frameBorder="0"
          loading="lazy"
          style={{ width: `1px`, minWidth: `100%`, height: `1600px` }}
        ></iframe>
        <iframe
          className="bg-primary dark:opacity-0 opacity-100 transition duration-200 dark:hidden flex"
          plausible-embed
          src={`https://stats.willit.fail/share/jcde.xyz?auth=Pqr0XnPWh6LTTlO6WjmEC&embed=true&background=transparent&theme=light`}
          scrolling="no"
          frameBorder="0"
          loading="lazy"
          style={{ width: `1px`, minWidth: `100%`, height: `1600px` }}
        ></iframe>
        <div className="pb-4">
          Stats powered by{` `}
          <a target="_blank" href="https://plausible.io" rel="noreferrer">
            Plausible Analytics
          </a>
        </div>
        <script async src="https://stats.willit.fail/js/embed.host.js"></script>
      </Layout>
    )
  } else return <></>
}

export default Stats
