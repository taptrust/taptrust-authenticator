
// @flow
import React  from "react";
import {Content, Input, Item, Label, Text} from "native-base";
import strings from "../resources/strings";
import PropTypes from "prop-types";
import * as Immutable from "../../node_modules/immutable/dist/immutable";
import ImmutableComponent from "./ImmutableComponent";

export default class ValidationTextInput extends ImmutableComponent {

  constructor(props: {}) {
    super(props);
    this.state = {
      data: Immutable.Map({
        error: "",
        showDefaultValue: true,
      })
    };
  }

  render() {
    const error = this.dataValue('error');
    return (
      <Content
        shouldRasterizeIOS
        renderToHardwareTextureAndroid
        style={this.props.style} scrollEnabled={false}>
        <Item floatingLabel style={{
          borderColor: error ? 'red' : this.props.color,
          ...validationTextStyles.itemStyle
        }}>
          <Label ellipsizeMode='tail' numberOfLines={1}
                 style={{color: this.props.color}}>{this.props.label}</Label>
          <Input
            style={validationTextStyles.inputStyle}
            secureTextEntry={this.props.secureTextEntry}
            onChangeText={this.handleTextChange}
            onEndEditing={this.setError}
            {...this.dataValue('showDefaultValue') ? {value: this.props.defaultValue} : {}}
          />
        </Item>
        <Text style={validationTextStyles.errorTextStyle}>{error } </Text>
      </Content>
    );
  }

  handleTextChange = (text: string) => {
    this.setData(d => d.set('error', '').set('showDefaultValue', false));
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  };

  setError = (event: {nativeEvent: {text: string}}) => {
    if (!this.props.validate(event.nativeEvent.text)) {
      if (!event.nativeEvent.text || event.nativeEvent.text === "") {
        this.setData(d => d.set('error', strings.empty_error))
      } else {
        this.setData(d => d.set('error', this.props.error))
      }
    } else {
      this.setData(d => d.set('error', ''))
    }
  };
}

const validationTextStyles = {
  errorTextStyle: {
    color: 'red'
  },
  itemStyle: {
    flex: 0,
    marginTop: 16
  },
  inputStyle: {
    color: 'white'
  }
};

ValidationTextInput.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  defaultValue: PropTypes.string
};

