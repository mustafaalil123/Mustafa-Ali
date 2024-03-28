import * as React from 'react'
import {
  FiPackage,
  FiHome,
  FiUsers,
  FiBarChart2,
} from 'react-icons/fi'
import { FaTools } from 'react-icons/fa'
import { VStack, Box, Link, LinkProps } from '@chakra-ui/react'
import { TimelineItem } from './Timeline'
import { PageSlideFade } from 'components/shared/animations/page-transitions'
import Header from 'components/shared/header'
import NextLink from 'next/link'
import { useLinkColor } from 'components/theme'

interface ExternalLinkProps extends LinkProps {
  url: string
  linkProps?: LinkProps
  text: string
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  url,
  linkProps,
  text,
  ...props
}) => {
  return (
    <NextLink href={url} passHref>
      <Link {...linkProps} {...props}>
        {text}
      </Link>
    </NextLink>
  )
}

const Achievements = () => {
  const linkColor = useLinkColor()

  return (
    <PageSlideFade>
      <Box textAlign="start" mb={6}>
        <Header mt={0} mb={0}>
          Achievements
        </Header>
      </Box>
      <VStack textAlign="start" align="start" mb={5}>
        <Box zIndex={5}>
          <Box>
            <TimelineItem icon={FaTools}>
            FYP Awarded Selection by
              <ExternalLink
                color={linkColor}
                url="https://ignite.org.pk/"
                text={' Ignite Pakistan'}
                target="_blank"
              />{' '}
            </TimelineItem>
            <TimelineItem icon={FiUsers}>TAship and Dean's List Certificates by <ExternalLink
                color={linkColor}
                url="https://www.nu.edu.pk/"
                text={' FAST NUCES'}
                target="_blank"
              />{' '} </TimelineItem>
            <TimelineItem icon={FiPackage}>
            Semifinalist in Speed Programming Competition at
            <ExternalLink
                color={linkColor}
                url="https://cyberhackathon.pk/"
                text={' Digital Pakistan Cyber Security Hackathon'}
                target="_blank"
              />{' '}
             (2021)
            </TimelineItem>
            <TimelineItem icon={FiPackage}>
            Game Development course from Michigan State University, 
            <ExternalLink
                color={linkColor}
                url="https://www.coursera.org/"
                text={' Coursera'}
                target="_blank"
              />{' '}
            </TimelineItem>
            <TimelineItem icon={FiBarChart2}>
              Graduated from
              <ExternalLink
                color={linkColor}
                url="https://mlabs.co/game-jams/rookie-game-jam-2021/"
                text={' Rookie Game Jam, '}
                target="_blank"
              />
               Only 269 out of 1600 applicants could clear this program from all over the pakistan.
            </TimelineItem>
            <TimelineItem icon={FiHome} skipTrail>
              Runner Up at 
              <ExternalLink
                color={linkColor}
                url="https://www.au.edu.pk/pages/Faculties/Mechatronics_Biomedical_Engineering/Departments/Biomedical/Extra_Curricular_Activities.aspx"
                text={" AirTech'19"}
                target="_blank"
              />
              .
            </TimelineItem>
            <TimelineItem icon={FiBarChart2} skipTrail>
              Semifinalist at LUMS  
              <ExternalLink
                color={linkColor}
                url="https://www.intechww.com/codinguru-2-0"
                text={" Coding Guru 2.0"}
                target="_blank"
              />
              .
            </TimelineItem>
          </Box>
        </Box>

      </VStack>
    </PageSlideFade>
  )
}

export default Achievements
