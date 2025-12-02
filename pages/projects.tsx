import { Fragment } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { VStack, Text, useColorModeValue, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { projectsList } from '../data/projectData';
import PageLayout from 'components/layouts/pageLayout';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import {
  LeftProjectLayoutLarge,
  ProjectLayoutMed,
  RightProjectLayoutLarge,
} from 'components/layouts/projectLayout';
import { ProjectProps } from 'interfaces/interface';
import { useLinkColor } from 'components/theme';

const title = 'Projects 📚';
const subtitle =
  "A selection of projects I've worked on, during my career as a software developer.";

const TURQUOISE = '#06b6d4';

const Projects: NextPage<ProjectProps> = (props) => {
  const { projects } = props;
  const linkColor = useLinkColor();
  const router = useRouter();

  const handleOpenDetail = (slug: string) => {
    router.push({
      pathname: '/ProjectDetail',
      query: { slug },
    });
  };

  return (
    <Fragment>
      <PageLayout title={title} description={subtitle}>
        <PageSlideFade>
          <VStack align="start">
            <Header underlineColor={TURQUOISE} mt={0} mb={2} color={linkColor}>
              Projects
            </Header>
            <Text
              color={useColorModeValue('gray.500', 'gray.200')}
              textAlign="left"
            >
              {subtitle}
            </Text>
          </VStack>

          <VStack spacing={8} mt={['7', '7', '8']}>
            {projects.map((project, index) => (
              <Fragment key={project.id ?? index}>
                <Box
                  w="100%"
                  cursor="pointer"
                  onClick={() => handleOpenDetail(project.slug)}
                >
                  <ProjectLayoutMed project={project} />
                </Box>

                {index % 2 === 0 ? (
                  <LeftProjectLayoutLarge project={project} />
                ) : (
                  <RightProjectLayoutLarge project={project} />
                )}
              </Fragment>
            ))}
          </VStack>
        </PageSlideFade>
      </PageLayout>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
  return {
    props: {
      projects: projectsList,
    },
  };
};

export default Projects;
