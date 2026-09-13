export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const formData = await req.formData();
    const image = formData.get('image');

    if (!image) {
      return res.status(400).json({
        error: 'No image provided'
      });
    }

    const imaggaForm = new FormData();
    imaggaForm.append('image', image);

    const credentials = Buffer.from(
      `${process.env.IMAGGA_API_KEY}:${process.env.IMAGGA_API_SECRET}`
    ).toString('base64');

    const response = await fetch(
      'https://api.imagga.com/v2/colors',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`
        },
        body: imaggaForm
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.status?.text || 'Imagga API request failed'
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Failed to analyze image'
    });
  }
}