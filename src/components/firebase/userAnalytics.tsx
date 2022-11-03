import { DataGraph } from 'src/components/analytics/datagraph'
import { HeatMap } from 'src/components/analytics/heatmap'
import { SimpleGrid, Text } from '@mantine/core'
import { auth, db } from './firebase'
import { useEffect, useState } from 'react'

const UserAnalytics = () => {
  const [log, setLog] = useState<Array<{ date: string; count: number }>>()
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
    <div>
      {log ? (
        <SimpleGrid
          py={60}
          cols={2}
          spacing="lg"
          breakpoints={[{ maxWidth: 800, cols: 1, spacing: 'md' }]}
        >
          <div>
            <HeatMap values={log} />
          </div>
          <div>
            <DataGraph values={log} />
          </div>
        </SimpleGrid>
      ) : (
        <Text>表示する結果がまだありません</Text>
      )}
    </div>
  )
}

export default UserAnalytics
