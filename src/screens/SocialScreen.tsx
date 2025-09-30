import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type SocialScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Social'>;

type Props = {
  navigation: SocialScreenNavigationProp;
};

interface Post {
    author: string;
    time: string;
    content: string;
    userImage: any;
    images: any[];
    likes: number;
    comments: number;
    shares: number;
    liked: boolean;
}

const initialPosts: Post[] = [
  {
    author: 'Harish Ramu',
    time: '1d ago',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
    likes: 12,
    comments: 5,
    shares: 2,
    userImage: require('../assets/user.png'),
    images: [],
    liked: false,
  },
  {
    author: 'Anusha Saran',
    time: '2d ago',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    userImage: require('../assets/user.png'),
    images: [
      require('../assets/img.png'),
      require('../assets/img.png'),
      require('../assets/img.png'),
    ],
    likes: 0,
    comments: 0,
    shares: 0,
    liked: false,
  },
  {
      author: 'john',
      time: '9d ago',
      content: 'dolor sit amet, consectetur adipiscing elit, sed do.',
      userImage: require('../assets/user.png'),
      images: [
        require('../assets/img.png'),
        require('../assets/img.png'),
      ],
      likes: 9,
      comments: 6,
      shares: 3,
      liked: false,
    },
];

const SocialScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState(initialPosts);

  const handleLike = (index: number) => {
    const newPosts = [...posts];
    const post = newPosts[index];
    if (post.liked) {
      post.likes -= 1;
    } else {
      post.likes += 1;
    }
    post.liked = !post.liked;
    setPosts(newPosts);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerUser}>
            <Image source={require('../assets/user.png')} style={styles.userImage} />
            <View>
                <Text style={styles.userName}>Harish Ramu</Text>
                <Text style={styles.userRole}>Sales & Marketing</Text>
            </View>
        </View>
        <Image source={require('../assets/noti.png')} style={styles.bellIcon} />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.startWritingContainer}>
            <ImageBackground source={require('../assets/bg.png')} style={styles.bg}>
          <Text style={styles.startWritingTitle}>Hey</Text>
          <Text style={styles.startWritingSubtitle}>What's on your mind today?</Text>
           <TouchableOpacity style={styles.startWritingButton} onPress={() => navigation.navigate('CreatePost')}>
            <Text style={styles.startWritingButtonText}>Start Writing...</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={post.userImage} style={styles.postUserImage} />
              <View style={styles.postHeaderText}>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.postOptions}>...</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.images.length > 0 && (
              <ScrollView horizontal style={styles.postImagesContainer}>
                {post.images.map((image, i) => (
                  <Image key={i} source={image} style={styles.postImage} />
                ))}
              </ScrollView>
            )}
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(index)}>
                <Icon name={post.liked ? "thumb-up" : "thumb-up-outline"} size={20} color={post.liked ? "#4CAF50" : "#666"} />
                <Text style={[styles.actionText, { color: post.liked ? "#4CAF50" : "#666" }]}>{post.likes > 0 && post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Comments', { post: post })}>
    <Icon name="comment-outline" size={20} color="#666" />
    <Text style={styles.actionText}>{post.comments > 0 && post.comments}</Text>
</TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="share-outline" size={20} color="#666" />
                <Text style={styles.actionText}>{post.shares > 0 && post.shares}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Loyalty')}><Image source={require('../assets/Group.png')} style={styles.navIcon} /><Text>Loyalty</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/social.png')} style={styles.navIcon} /><Text style={{color:"#4CAF50"}}>Social</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/product.png')} style={styles.navIcon} /><Text>Products</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/activity.png')} style={styles.navIcon} /><Text>My Activities</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/more.png')} style={styles.navIcon} /><Text>More</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9e5ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRole: {
    color: '#666',
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  startWritingContainer: {
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  bg:{
    width: '100%',
    alignItems: 'center',
    padding:20
  },
  startWritingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  startWritingSubtitle: {
    color: '#666',
    marginBottom: 15,
  },
  startWritingButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startWritingButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postHeaderText: {
    flex: 1,
    marginLeft: 10,
  },
  postAuthor: {
    fontWeight: 'bold',
  },
  postTime: {
    color: '#666',
  },
  postOptions: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postContent: {
    marginVertical: 10,
  },
  postImagesContainer: {
    flexDirection: 'row',
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  postActions: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  actionText: {
    color: '#666',
    marginLeft: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
});

export default SocialScreen;
