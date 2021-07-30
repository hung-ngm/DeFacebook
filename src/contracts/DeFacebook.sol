// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeFacebook {
  string public name = "DeFacebook";
  uint public postsCount = 0;
  uint public commentsCount = 0;
  mapping(uint => Post) public posts;
  mapping(uint => Comment) public comments;

  struct Post {
    uint id;
    string title;
    string body;
    uint tipAmount;
    address payable author;
  }

  struct Comment {
    uint id;
    string body;
    uint tipAmount;
    address payable commenter;
  }

  event PostCreated(
    uint id,
    string title,
    string body,
    uint tipAmount,
    address payable author
  );

  event CommentCreated(
    uint id,
    string body,
    uint tipAmount,
    address payable commenter
  );

  event CommentTipped(
    uint id,
    string body,
    uint tipAmount,
    address payable commenter
  );

  event PostTipped(
    uint id,
    string title,
    string body,
    uint tipAmount,
    address payable author
  );

  constructor() public {
    name = "DeFacebook";
  }

  // Create posts
  function createPost(string memory _title, string memory _body) public {
    require(bytes(_title).length > 0, 'Title must not be empty');
    require(bytes(_body).length > 0, 'Body must not be empty');
    require(msg.sender != address(0), 'Msg sender must exist');

    postsCount ++;
    posts[postsCount] = Post(postsCount, _title, _body, 0, msg.sender);
    emit PostCreated(postsCount, _title, _body, 0, msg.sender);
  }

  // Tip posts
  function tipPost(uint _id) public payable {
    require(postsCount > 0 && _id <= postsCount, 'Must exist posts and valid id');

    Post memory _post = posts[_id];
    address payable _author = _post.author;

    address(_author).transfer(msg.value);
    _post.tipAmount = _post.tipAmount + msg.value;
    posts[_id] = _post;

    emit PostTipped(_id, _post.title, _post.body, _post.tipAmount, _author);
  }

  // Create comments
  function createComment(string memory _commentBody) public {
    require(bytes(_commentBody).length > 0, 'Comment Body must not be empty');
    require(msg.sender != address(0), 'Must exist msg sender');

    commentsCount ++;
    comments[commentsCount] = Comment(commentsCount, _commentBody, 0, msg.sender);
    emit CommentCreated(commentsCount, _commentBody, 0, msg.sender);
  }

  // Tip comments
  function tipCommenter(uint _id) public payable {
    require(commentsCount > 0 && _id <= commentsCount, 'Valid id and exist comments');

    Comment memory _comment = comments[_id];
    address payable _commenter = _comment.commenter;

    address(_commenter).transfer(msg.value);
    _comment.tipAmount = _comment.tipAmount + msg.value;
    comments[_id] = _comment;

    emit CommentTipped(_id, _comment.body, _comment.tipAmount, _commenter);
  }

}