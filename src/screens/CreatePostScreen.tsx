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
  ImageBackground,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

interface Attachment {
    uri: string;
    type: 'image' | 'video' | 'pdf';
    name: string;
}

type CreatePostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePost'>;

type Props = {
  navigation: CreatePostScreenNavigationProp;
};

const CreatePostScreen: React.FC<Props> = ({ navigation }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isWriting, setIsWriting] = useState(false);

  const handleChooseMedia = () => {
    if (attachments.length >= 10) {
        return;
    }
    launchImageLibrary({ mediaType: 'mixed', selectionLimit: 10 - attachments.length }, (response) => {
      if (response.assets) {
        const newAttachments = response.assets.map((asset: Asset): Attachment => ({
          uri: asset.uri!,
          type: asset.type?.startsWith('video') ? 'video' : 'image',
          name: asset.fileName ?? 'Untitled',
        }));
        setAttachments(prevAttachments => [...prevAttachments, ...newAttachments]);
      }
    });
  };

  const handleChooseFile = async () => {
    if (attachments.length >= 10) {
        return;
    }
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      const newAttachments = results.map((res: DocumentPickerResponse): Attachment => ({
        uri: res.uri,
        type: 'pdf',
        name: res.name ?? 'Untitled',
      }));
      if (attachments.length + newAttachments.length > 10) {
        return;
      }
      setAttachments(prevAttachments => [...prevAttachments, ...newAttachments]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const handleRemoveAttachment = (uri: string) => {
    setAttachments(attachments.filter(attachment => attachment.uri !== uri));
  }

  const renderAttachments = () => {
    return attachments.map(attachment => (
      <View key={attachment.uri} style={styles.attachmentContainer}>
        {attachment.type === 'pdf' ? (
          <View style={styles.pdfAttachment}>
            <Icon name="file-pdf-box" size={40} color="#FF0000" />
            <Text style={styles.attachmentName} numberOfLines={2}>{attachment.name}</Text>
          </View>
        ) : (
          <ImageBackground source={{ uri: attachment.uri }} style={styles.attachmentImage}>
            {attachment.type === 'video' && <Icon name="play-circle" size={40} color="#FFFFFF" style={styles.playIcon} />}
          </ImageBackground>
        )}
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveAttachment(attachment.uri)}>
          <Icon name="close-circle" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    ));
  }

  if (!isWriting) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Posts</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <Icon name="magnify" size={24} color="#000" style={{marginRight: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="bell-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.prewritingContent}>
                <View style={styles.userInfo}>
                    <Image source={require('../assets/user.png')} style={styles.userImage} />
                    <Text style={styles.userName}>Harish Ramu</Text>
                </View>
                <TouchableOpacity onPress={() => setIsWriting(true)} style={styles.startWritingButton}>
                    <Text style={styles.startWritingText}>Start writing...</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.bottomNav}>
                <Text>Loyalty</Text>
                <Text>Social</Text>
                <Text>Products</Text>
                <Text>All Orders</Text>
                <Text>Menu</Text>
            </View>
        </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>All Posts</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity>
                    <Icon name="magnify" size={24} color="#000" style={{marginRight: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="bell-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView style={styles.writingContent}>
            <View style={styles.userInfo}>
                <Image source={require('../assets/user.png')} style={styles.userImage} />
                <Text style={styles.userName}>Harish Ramu</Text>
            </View>

            <TextInput
                style={styles.textInput}
                placeholder="Write something..."
                multiline
                onChangeText={setText}
                value={text}
                autoFocus
            />

            <View style={styles.attachmentsGrid}>
                {renderAttachments()}
            </View>
            
            <View style={styles.attachmentButtons}>
                <TouchableOpacity onPress={handleChooseMedia} style={styles.attachmentButton}>
                    <Icon name="image-multiple" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChooseFile} style={styles.attachmentButton}>
                    <Icon name="file-document" size={24} color="#666" />
                </TouchableOpacity>
            </View>

        </ScrollView>
        <TouchableOpacity style={styles.postButton}>
            <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FFF0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 40,
        backgroundColor: '#F0FFF0',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    prewritingContent: {
        padding: 15,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    startWritingButton: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        minHeight: 100,
    },
    startWritingText: {
        color: '#A0A0A0',
        fontSize: 16,
    },
    writingContent: {
        padding: 15,
    },
    textInput: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        minHeight: 150,
        textAlignVertical: 'top',
        fontSize: 16,
        marginBottom: 20,
    },
    attachmentsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    attachmentContainer: {
        margin: 5,
        position: 'relative',
    },
    attachmentImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        opacity: 0.8,
    },
    pdfAttachment: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#EFEFEF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    attachmentName: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
    },
    removeButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    attachmentButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    attachmentButton: {
        marginRight: 15,
    },
    postButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 15,
    },
    postButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    }
});

export default CreatePostScreen;
