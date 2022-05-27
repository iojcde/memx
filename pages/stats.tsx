import Layout from 'components/Layout'
import { useTheme } from 'next-themes'

const Stats = () => {
  const { theme } = useTheme()
  if (theme != undefined) {
    return (
      <Layout>
        <iframe
          className="bg-primary hidden w-full"
          plausible-embed
          src={`https://stats.willit.fail/share/jcde.xyz?auth=Pqr0XnPWh6LTTlO6WjmEC&embed=true&background=transparent`}
          scrolling="no"
          frameBorder="0"
          loading="lazy"
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
