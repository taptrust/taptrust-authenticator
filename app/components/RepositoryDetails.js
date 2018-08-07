/**
 * Created by saionara1 on 7/5/17.
 */
import React, {Component} from "react";
import {Image, Text, View} from "react-native";
import {Container, Content, Spinner} from "native-base";
import colors from "../resources/colors";
import {connect} from "react-redux";
import dimens from "../resources/dimens";
import styles from "../resources/styles";
import HTML from "react-native-render-html";
import showdown from "showdown";
import strings from "../resources/strings";
import * as detailsActions from "../actions/details-actions";

const converter = new showdown.Converter();

export class RepositoryDetails extends Component {
  static navigationOptions = {
    title: strings.details,
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: colors.primaryColor
    }
  };

  constructor(props) {
    super(props);
    this.params = props.navigation.state.params;
  }

  componentDidMount() {
    this.dispatchReadme();
  }

  dispatchReadme() {
    this.props.dispatch(detailsActions.getReadMe(
      this.props.login.get('token'),
      this.params.repository.owner.login,
      this.params.repository.name));
  }

  componentDidUpdate() {
    this.handleError();
  }

  handleError() {
    const detailsError = this.props.details.get('detailsError');
    if (detailsError && detailsError.message) {
      Toast.showShortBottom(detailsError.message);
      this.props.dispatch(detailsActions.setError({}))
    }
  }


  render() {
    showdown.setFlavor('github');
    return (
      <Container style={{flexDirection: 'row'}}>
        <Content contentContainerStyle={detailsStyles.contentStyle}>
          <View style={detailsStyles.mainInfoStyle}>
            <Image style={detailsStyles.imageStyle} source={{uri: this.params.repository.owner.avatar_url}}/>
            <View style={detailsStyles.textContainer}>
              <Text style={detailsStyles.titleStyle}> {this.params.repository.full_name}</Text>
              <Text style={detailsStyles.descriptionStyle}> {this.params.repository.description}</Text>
            </View>
          </View>
          <Text style={detailsStyles.readMeLabel}>Read Me</Text>
          {this.renderProgress()}
          <View style={detailsStyles.readMeStyle}>
            <HTML
              html={converter.makeHtml(this.props.details.get('readMe'))}
              htmlStyles={styles}
              renderers={renderers}
            />
          </View>
        </Content>
      </Container>
    );
  }

  renderProgress() {
    if (this.props.root.get('progress')) {
      return ( <Spinner
        color={colors.accentColor}
        animating={true}
        size={'large'}
        style={styles.progressStyle}/>)
    } else {
      return null;
    }
  }
}
const renderers = {
  img: (htmlAttribs, children, passProps) => {
    console.log(htmlAttribs.src);
    return (
      <Image
        source={{uri: htmlAttribs.src, ...detailsStyles.imageStyle}}
      />)
  }
};

const detailsStyles = {
  contentStyle: {
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  mainInfoStyle: {
    marginVertical: dimens.margin_small,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: dimens.margin_medium
  },
  textContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: dimens.margin_small
  },
  titleStyle: {
    fontSize: dimens.text_size_button,
    fontWeight: 'bold',
    marginBottom: dimens.margin_small,
    marginTop: dimens.margin_small
  },
  descriptionStyle: {
    fontSize: 14,
    textAlign: 'left',

  },
  imageStyle: {
    width: 100,
    height: 100
  },
  readMeLabel: {
    fontSize: dimens.text_size_label,
    fontWeight: 'bold',
    marginVertical: dimens.margin_small,
    marginLeft: dimens.margin_medium
  },
  readMeStyle: {
    flex: 1,
    marginHorizontal: dimens.margin_medium,
  }
};


function mapStateToProps(state) {
  return {
    login: state.get('login'),
    list: state.get('list'),
    root: state.get('root'),
    details: state.get('details')
  }
}
export default connect(mapStateToProps)(RepositoryDetails)