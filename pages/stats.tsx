import Layout from 'components/Layout'
import { useTheme } from 'next-themes'

const Stats = () => {
  const { theme } = useTheme()
  if (theme != undefined) {
    return (
      <Layout>
        <iframe
          className="bg-primary hidden opacity-0 transition duration-200 dark:flex dark:opacity-100"
          plausible-embed
          src={`https://stats.willit.fail/share/jcde.xyz?auth=Pqr0XnPWh6LTTlO6WjmEC&embed=true&background=transparent&theme=dark`}
          scrolling="no"
          frameBorder="0"
          loading="lazy"
          style={{ width: `1px`, minWidth: `100%`, height: `1600px` }}
        ></iframe>
        <iframe
          className="bg-primary flex opacity-100 transition duration-200 dark:hidden dark:opacity-0"
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
