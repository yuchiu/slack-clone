import React from "react";
import PropTypes from "prop-types";

import Topic from "./Topic";
import { PublicOrPrivateTag } from "@/components/common";
import SubHeaderDivider from "./SubHeaderDivider";

class ChannelHeader extends React.Component {
  state = {
    isEditOn: false
  };

  componentDidMount() {}

  toggleEdit = () => {
    this.setState = {
      isEditOn: !this.state.isEditOn
    };
  };

  render() {
    const {
      currentChannelMembers,
      currentChannel,
      handleSwitchRightSidebarView
    } = this.props;
    return (
      <div className="main-header__title">
        <h1 className="main-header__title__name">
          {currentChannel.public ? (
            <PublicOrPrivateTag publicChannel={true} addClass="dark" />
          ) : (
            <PublicOrPrivateTag publicChannel={false} addClass="dark" />
          )}{" "}
          {currentChannel.name}
        </h1>
        <div className="main-header__title__sub-header">
          <i
            className="far fa-user main-header__title__sub-header__icon"
            onClick={handleSwitchRightSidebarView}
          />
          <span
            className="main-header__title__sub-header__number"
            onClick={handleSwitchRightSidebarView}
          >
            {" "}
            {currentChannelMembers.length}
            <SubHeaderDivider />
          </span>
          <Topic topic={currentChannel.brief_description} />
        </div>
      </div>
    );
  }
}

ChannelHeader.propTypes = {
  currentChannelMembers: PropTypes.array.isRequired,
  currentChannel: PropTypes.object.isRequired,
  handleSwitchRightSidebarView: PropTypes.func.isRequired
};

export default ChannelHeader;