import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useState } from 'react';
import { post, get } from '../../utils/fetch';

export const CubbyUpload = (props) => {

  const [passwordToggle, setPasswordToggle] = useState(false)
  const handlePasswordToggle = () => setPasswordToggle(!passwordToggle)

  const [publicToggle, setPublicToggle] = useState(false)
  const handlePublicToggle = () => setPublicToggle(!publicToggle)

  const [name, setName] = useState(null)
  const handleName = (e) => {setName(e.target.value)}
  const [description, setDescription] = useState(null)
  const handleDescription = (e) => {setDescription(e.target.value)}
  const [files, setFiles] = useState(null)
  const handleFiles = (e) => {setFiles(e.target.value)}
  const [members, setMembers] = useState(null)
  const handleMembers = (e) => {setMembers(e.target.value)}
  const [password, setPassword] = useState(null)
  const handlePassword = (e) => {setPassword(e.target.value)}

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='font-roboto'>Cubby Creator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="UploadName" className='font-roboto mb-0'>Name of Cubby</Form.Label>
          <Form.Control
            type="Text"
            id="UploadName"
            aria-describedby="UploadName"
            maxLength={32}
            onChange={handleName}
          />
          <Form.Label htmlFor="UploadDescription" className='font-roboto mb-0 mt-3'>Description</Form.Label>
          <Form.Control
            as="textarea"
            id="UploadDescription"
            aria-describedby="UploadDescription"
            maxLength={256}
            onChange={handleDescription}
          />
          <Form.Check  className='mt-3'
            disabled={passwordToggle}
            type="switch"
            id="Public"
            label="Public (Anyone can view your files)"
            onClick={() => handlePublicToggle()}
          />
          <Form.Check className='mt-1'
            disabled={publicToggle}
            type="switch"
            label="Password Protect this Cubby"
            id="PasswordToggle"
            onClick={() => handlePasswordToggle()}
          />
          {showPassword(passwordToggle, handlePassword)}
          <Form.Label htmlFor="UploadMembers" className='font-roboto mt-3 mb-0'>Add Members</Form.Label>
          <Form.Control
            type="Text"
            id="UploadMembers"
            aria-describedby="UploadMembers"
            maxLength={64}
            onChange={handleMembers}
          />
          <Form.Text id="UploadMembers" muted>
            Members will only be granted read priviledes, this can be updated later
          </Form.Text>
        </Modal.Body>
        <Form.Group controlId="formFileMultiple" className="m-3">
          <Form.Label className='mb-0'>Select Files</Form.Label>
          <Form.Control type="file" multiple onChange={handleFiles} />
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant='success'
            onClick={async ()=> {
              if(!name || !files) return alert('Need name and files')
              const cubby = {
                name: name,
                creator: props.creator,
                description: description,
                files: files,
                members: members,
                private: !publicToggle,
                password: publicToggle ? null : password,
              }
              try {
                await createCubby(cubby, props.JWT, props.Login, props.Logout)
              } catch (err) { console.log(err) }
              props.handleClose()
              props.fetchCubbies()
            }}
          >Create Cubby</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const showPassword = (toggle, handlePassword) => {
  if(toggle) {
    return (
      <>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          autoComplete='new-password'
          aria-describedby="passwordHelpBlock"
          onChange={handlePassword}
        />
      </>
    )
  }
}

const createCubby = async (cubby, JWT, Login, Logout) => {
  try {
    await get('/refresh', null).then(jwt => {
      if(jwt.success === 'authenticated') Login(jwt.token)
      else Logout()
    })
  } catch (err) {console.log(err)}
  try {
    await post('/api/createCubby', JWT, cubby).then(res => console.log(res))
  } catch (err) { console.log(err) }
}
