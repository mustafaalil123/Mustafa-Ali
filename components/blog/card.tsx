import {
  VStack,
  HStack,
  Heading,
  Text,
  Link,
  Tooltip,
  useColorModeValue,
  Flex,
  Image,
  Box,
  Skeleton,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { CardTransition } from '../shared/animations/page-transitions';
import { BlogPost } from '../../interfaces/interface';
import moment from 'moment';
import { useLinkColor } from 'components/theme';
import { Tags } from 'components/shared/Tags';
import { HeartIcon, CommentIcon } from 'components/shared/icons';
import DisplayText from 'components/shared/icons/DisplayText';

interface IProps {
  post: BlogPost;
  isLoading: boolean;
  postDbLikes: number;
}

const PostCard: React.FC<IProps> = ({ post, isLoading, postDbLikes }) => {
  const linkColor = useLinkColor();
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderCol = useColorModeValue('gray.200', 'gray.700');
  const devIcon = useColorModeValue(
    '/assets/images/logos/dev.png',
    '/assets/images/logos/dev_white.png'
  );

  const totalReactions = (Number(post.public_reactions_count) || 0) + (postDbLikes || 0);
  const hasReactions = totalReactions > 0;
  const hasComments = !!post.comments_count;

  return (
    <CardTransition>
      <VStack
        spacing={3}
        p={4}
        align="stretch"
        borderWidth="1px"
        borderColor={borderCol}
        rounded="md"
        bg={cardBg}
        position="relative"
        _hover={{ shadow: 'md', textDecoration: 'none' }}
      >
        {post.url && (
          <Tooltip hasArrow label="Dev.to" placement="top">
            <Image
              src={devIcon}
              alt="Dev.to"
              width="2rem"
              height="2rem"
              position="absolute"
              right="0.5rem"
              top="-14px"
              loading="lazy"
            />
          </Tooltip>
        )}

        <HStack justify="space-between" align="flex-start">
          <Heading as="h3" fontSize="lg" mt={0} noOfLines={2}>
            <NextLink href={`/blog/${post.slug}`} passHref legacyBehavior>
              <Link aria-label={`Open blog post: ${post.title}`} color={linkColor}>
                {post.title}
              </Link>
            </NextLink>
          </Heading>

          <HStack spacing={3} display={['none', 'flex']}>
            {hasReactions && (
              <Flex align="center" gap={1}>
                <DisplayText isLoading={isLoading} value={totalReactions} />
                <HeartIcon />
              </Flex>
            )}
            {hasComments && (
              <Flex align="center" gap={1}>
                <DisplayText isLoading={false} value={post.comments_count!} />
                <CommentIcon />
              </Flex>
            )}
          </HStack>
        </HStack>

        <HStack spacing={3} wrap="wrap">
          <Tooltip hasArrow label="Published" placement="top">
            <Text fontSize="sm" fontWeight="600" color={textColor}>
              {moment(post.published_at).format('Do MMMM YYYY')}
            </Text>
          </Tooltip>

          <HStack spacing={3} display={['flex', 'none']}>
            {hasReactions && (
              <Tooltip hasArrow label="Reactions" placement="top">
                <Flex align="center" gap={1}>
                  <DisplayText isLoading={isLoading} value={totalReactions} />
                  <HeartIcon />
                </Flex>
              </Tooltip>
            )}
            {hasComments && (
              <Tooltip hasArrow label="Comments" placement="top">
                <Flex align="center" gap={1}>
                  <DisplayText isLoading={false} value={post.comments_count!} />
                  <CommentIcon />
                </Flex>
              </Tooltip>
            )}
          </HStack>
        </HStack>

        {/* Tags (desktop) */}
        <Box display={['none', null, 'block']}>
          <Tags
            tags={post.tag_list}
            interactive={false}
            tagProps={{ padding: '0 6px', size: 'sm' }}
          />
        </Box>

        {/* Tags (mobile/tablet) */}
        <Box display={['block', null, 'none']}>
          <Wrap shouldWrapChildren spacing={1}>
            {post.tag_list?.map((t) => (
              <WrapItem key={t}>
                <Tags
                  tags={[t]}
                  interactive={false}
                  tagProps={{ padding: '0 6px', size: 'sm' }}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        <Skeleton isLoaded={!isLoading}>
          <Text align="left" fontSize="md" noOfLines={2} color={textColor}>
            {post.description}
          </Text>
        </Skeleton>
      </VStack>
    </CardTransition>
  );
};

export default PostCard;
