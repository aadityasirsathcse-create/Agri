import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

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

interface Comment {
  author: string;
  time: string;
  content: string;
  userImage: any;
}

interface Attachment {
  uri: string;
  type: 'image' | 'file';
  name: string;
}

type CommentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Comments'
>;
type CommentScreenRouteProp = RouteProp<RootStackParamList, 'Comments'>;

type Props = {
  navigation: CommentScreenNavigationProp;
  route: CommentScreenRouteProp;
};

const CommentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { post } = route.params;
  const [isFocused, setIsFocused] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const comments: Comment[] = [
    {
      author: 'Karthik Naren',
      time: '1h ago',
      content: 'Thanks harish & Ajith :)',
      userImage: require('../assets/user.png'),
    },
    {
      author: 'Harish Ramu',
      time: '3h ago',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim',
      userImage: require('../assets/user.png'),
    },
    {
      author: 'Ajith Kumar',
      time: '3h ago',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      userImage: require('../assets/user.png'),
    },
  ];

  // Request Android permissions for image picker
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error: ', err);
        return false;
      }
    }
    return true;
  };

  const handleChoosePhoto = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      console.log('Storage permission denied');
      return;
    }

    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 1 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset: Asset = response.assets[0];
          const newAttachment: Attachment = {
            uri: asset.uri ?? '',
            type: 'image',
            name: asset.fileName ?? 'image.jpg',
          };
          setAttachments((prev) => [...prev, newAttachment]);
        }
      },
    );
  };

  const handleChooseFile = async () => {
    try {
      // const res = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
      // });
      // if (res && res.length > 0) {
      //   const file = res[0];
      //   const newAttachment: Attachment = {
      //     uri: file.uri,
      //     type: 'file',
      //     name: file.name ?? 'file',
      //   };
      //   setAttachments((prev) => [...prev, newAttachment]);
      // }
    } catch (err) {
      // if (DocumentPicker.isCancel(err)) {
      //   console.log('User cancelled file picker');
      // } else {
      //   console.error('FilePicker Error: ', err);
      // }
    }
  };

  const handleRemoveAttachment = (uri: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.uri !== uri));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Posts</Text>
          <Icon name="bell-outline" size={24} color="#000" />
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setIsFocused(false);
          }}>
          <View style={[styles.scrollView, isFocused && styles.dimmed]}>
            <ScrollView>
              <View style={styles.postContainer}>
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
                <View style={styles.postActions}>
                  <Icon name="thumb-up-outline" size={20} color="#666" />
                  <Text style={styles.actionText}>{post.likes}</Text>
                  <Icon name="comment-outline" size={20} color="#666" />
                  <Text style={styles.actionText}>{post.comments}</Text>
                  <Icon name="share-outline" size={20} color="#666" />
                  <Text style={styles.actionText}>{post.shares}</Text>
                </View>
              </View>

              {!isFocused && (
                <View style={styles.commentsSection}>
                  <Text style={styles.commentsTitle}>
                    Comments ({comments.length})
                  </Text>
                  {comments.map((comment, index) => (
                    <View key={index} style={styles.commentContainer}>
                      <Image
                        source={comment.userImage}
                        style={styles.commentUserImage}
                      />
                      <View style={styles.commentContent}>
                        <View style={styles.commentHeader}>
                          <Text style={styles.commentAuthor}>
                            {comment.author}
                          </Text>
                          <Text style={styles.commentTime}>{comment.time}</Text>
                        </View>
                        <Text>{comment.content}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        {isFocused ? (
          <View style={styles.focusedCommentInputContainer}>
            <TextInput
              style={styles.focusedCommentInput}
              placeholder="Comment"
              multiline
              autoFocus
            />
            <ScrollView horizontal style={styles.attachmentsContainer}>
              {attachments.map((attachment) => (
                <View key={attachment.uri} style={styles.attachmentPreview}>
                  {attachment.type === 'image' ? (
                    <ImageBackground
                      source={{ uri: attachment.uri }}
                      style={styles.attachmentImage}>
                      <TouchableOpacity
                        style={styles.removeAttachmentButton}
                        onPress={() => handleRemoveAttachment(attachment.uri)}>
                        <Icon name="close-circle" size={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    </ImageBackground>
                  ) : (
                    <View style={styles.fileAttachment}>
                      <Icon name="file" size={40} color="#666" />
                      <Text style={styles.fileName} numberOfLines={2}>
                        {attachment.name}
                      </Text>
                      <TouchableOpacity
                        style={styles.removeAttachmentButton}
                        onPress={() => handleRemoveAttachment(attachment.uri)}>
                        <Icon name="close-circle" size={20} color="#000000" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
            <View style={styles.focusedCommentActions}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={handleChoosePhoto}>
                  <Icon
                    name="image-plus"
                    size={24}
                    color="#666"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChooseFile}>
                  <Icon name="file-plus" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.commentInputContainer}>
            <Image
              source={require('../assets/user.png')}
              style={styles.commentInputUserImage}
            />
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setIsFocused(true)}>
              <Text style={styles.commentInput}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Icon name="image-plus" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // keep all your styles unchanged
  container: {
    flex: 1,
    backgroundColor: '#e5f9e5ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 40,
    backgroundColor: '#e5f9e5ff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dimmed: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
  },
  actionText: {
    color: '#666',
    marginLeft: 5,
    marginRight: 20,
  },
  commentsSection: {
    padding: 15,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentTime: {
    color: '#666',
    fontSize: 12,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  commentInputUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    lineHeight: 25,
  },
  focusedCommentInputContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  focusedCommentInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    color: 'black',
  },
  focusedCommentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  attachmentsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  attachmentPreview: {
    marginRight: 10,
  },
  attachmentImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  fileAttachment: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  fileName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  removeAttachmentButton: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
});

export default CommentScreen;

