import { DataGraph } from 'src/components/analytics/datagraph'
import { HeatMap } from 'src/components/analytics/heatmap'
import { SimpleGrid, Text } from '@mantine/core'
import { auth, db } from './firebase'
import { useEffect, useState } from 'react'
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import { formatDate } from 'src/components/analytics/datagraph'

const shareUrl = 'https://jphacks-2022-4839e.web.app/'

const body = (hour: number) => {
  return `『VRooM』で今週は ${hour}分 作業しました！！`
}

const getTotalHour = (logs: Array<{ date: string; count: number }>) => {
  const dt = new Date()
  dt.setDate(dt.getDate() - 7)
  const dateString = formatDate(dt)
  let totalHour = 0
  for (const l of logs) {
    if (dateString <= l.date) {
      totalHour += l.count
    }
  }
  return totalHour
}

const UserAnalytics = () => {
  const [log, setLog] = useState<Array<{ date: string; count: number }>>()
  const [totalHour, setTotalHour] = useState(0)

  if (!auth.currentUser) {
    return null
  }

  useEffect(() => {
    const docRef = db.collection('log').doc(auth.currentUser?.uid)
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data()
          setLog(data?.log)
          setTotalHour(getTotalHour(data?.log))
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  }, [])

  return (
    <>
      <EmailShareButton url={shareUrl} subject="VRooM" body={body(totalHour)}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <FacebookShareButton url={shareUrl} quote={body(totalHour)}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={body(totalHour)}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LineShareButton url={shareUrl} title={body(totalHour)}>
        <LineIcon size={32} round />
      </LineShareButton>
      {/* <Text size="xs" color="gray" style={{ fontSize: 20 }}>
        {body(totalHour)}
      </Text> */}
      {log ? (
        <SimpleGrid
          py={60}
          cols={2}
          spacing="lg"
          breakpoints={[{ maxWidth: 992, cols: 1, spacing: 'md' }]}
        >
          <div style={{ maxWidth: 700 }}>
            <HeatMap values={log} />
          </div>
          <div style={{ maxWidth: 700 }}>
            <DataGraph values={log} />
          </div>
        </SimpleGrid>
      ) : (
        <Text>表示する結果がまだありません</Text>
      )}
    </>
  )
}

export default UserAnalytics
